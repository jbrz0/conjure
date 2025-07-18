import { createServiceClient } from './supabase/server'
import { User, UsageQuota } from './types'

const ANONYMOUS_LIMIT = 10
const FREE_LIMIT = 50
const PRO_LIMIT = 1500

export async function getAnonymousUsage(): Promise<UsageQuota> {
  // This will be handled client-side with localStorage
  return {
    used: 0,
    limit: ANONYMOUS_LIMIT,
  }
}

export async function getUserQuota(userId: string): Promise<UsageQuota | null> {
  const supabase = createServiceClient()
  
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error || !user) {
    return null
  }

  const limit = user.plan === 'pro' ? PRO_LIMIT : FREE_LIMIT
  const periodStart = new Date(user.period_start)
  const now = new Date()
  
  // Check if period has expired
  const periodLength = user.plan === 'pro' ? 30 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000 // 30 days
  const resetDate = new Date(periodStart.getTime() + periodLength)
  
  if (now > resetDate) {
    // Reset the quota
    await supabase
      .from('users')
      .update({
        messages_sent: 0,
        period_start: now.toISOString(),
      })
      .eq('id', userId)
    
    return {
      used: 0,
      limit,
      resetDate: new Date(now.getTime() + periodLength),
    }
  }

  return {
    used: user.messages_sent,
    limit,
    resetDate,
  }
}

export async function incrementUserUsage(userId: string): Promise<boolean> {
  const supabase = createServiceClient()
  
  const quota = await getUserQuota(userId)
  if (!quota || quota.used >= quota.limit) {
    return false
  }

  const { error } = await supabase
    .from('users')
    .update({
      messages_sent: quota.used + 1,
    })
    .eq('id', userId)

  return !error
}

export async function canUserSendMessage(userId: string | null): Promise<{
  canSend: boolean
  quota?: UsageQuota
  error?: string
}> {
  if (!userId) {
    // Anonymous user - check localStorage on client side
    return { canSend: true }
  }

  const quota = await getUserQuota(userId)
  if (!quota) {
    return { canSend: false, error: 'User not found' }
  }

  if (quota.used >= quota.limit) {
    return { 
      canSend: false, 
      quota, 
      error: `You've reached your ${quota.limit} message limit. ${quota.resetDate ? `Resets on ${quota.resetDate.toLocaleDateString()}` : 'Upgrade to Pro for more messages.'}` 
    }
  }

  return { canSend: true, quota }
}
