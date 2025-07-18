import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getUserQuota, canUserSendMessage } from '../quota'

// Mock Supabase
import { createServiceClient } from '../supabase/server'

// Mock the entire supabase/server module
vi.mock('../supabase/server')

// Create a typed mock for createServiceClient
const mockedCreateServiceClient = vi.mocked(createServiceClient)

describe('Quota Management', () => {
  let mockSupabaseClient: any

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()

    // Setup the mock Supabase client structure
    mockSupabaseClient = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      single: vi.fn(),
    }

    // Make createServiceClient return our mock client
    mockedCreateServiceClient.mockReturnValue(mockSupabaseClient)
  })

  describe('canUserSendMessage', () => {
    it('should allow anonymous users to send messages', async () => {
      const result = await canUserSendMessage(null)
      expect(result.canSend).toBe(true)
    })

    it('should handle user not found', async () => {
      // Simulate Supabase returning an error and no data
      mockSupabaseClient.single.mockResolvedValue({ data: null, error: { message: 'User not found', details: '', hint: '', code: '404' } })

      const result = await canUserSendMessage('non-existent-user')

      expect(result.canSend).toBe(false)
      expect(result.error).toBe('User not found')
      // Ensure the Supabase client was called correctly
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('users')
      expect(mockSupabaseClient.select).toHaveBeenCalledWith('*')
      expect(mockSupabaseClient.eq).toHaveBeenCalledWith('id', 'non-existent-user')
    })

    it('should allow a free user under quota to send a message', async () => {
      const mockUser = {
        id: 'free-user',
        plan: 'free',
        messages_sent: 10,
        period_start: new Date().toISOString(),
      }
      mockSupabaseClient.single.mockResolvedValue({ data: mockUser, error: null })

      const result = await canUserSendMessage('free-user')

      expect(result.canSend).toBe(true)
      expect(result.error).toBeUndefined()
      expect(result.quota?.used).toBe(10)
      expect(result.quota?.limit).toBe(50)
    })

    it('should deny a pro user over quota from sending a message', async () => {
      const mockUser = {
        id: 'pro-user',
        plan: 'pro',
        messages_sent: 1500,
        period_start: new Date().toISOString(),
      }
      mockSupabaseClient.single.mockResolvedValue({ data: mockUser, error: null })

      const result = await canUserSendMessage('pro-user')

      expect(result.canSend).toBe(false)
      expect(result.error).toContain("You've reached your 1500 message limit.")
    })
  })

  describe('getUserQuota', () => {
    it('should return null if the user is not found', async () => {
      mockSupabaseClient.single.mockResolvedValue({ data: null, error: { message: 'Not found' } })
      const quota = await getUserQuota('non-existent-user')
      expect(quota).toBeNull()
    })
  })
})
