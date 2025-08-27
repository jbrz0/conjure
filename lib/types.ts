import { z } from 'zod'

// AI Response Schema
// This schema now matches the 'FormField' interface in DynamicForm.tsx
export const FieldSpecSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum(['text', 'select']),
  options: z.array(z.string()).optional(),
  defaultValue: z.string().optional(),
});

const TextComponentSchema = z.object({
  kind: z.literal('text'),
  content: z.string(),
});

const ChartComponentSchema = z.object({
  kind: z.literal('chart'),
  chartType: z.enum(['bar', 'line', 'pie']),
  data: z.array(z.object({ label: z.string(), value: z.number() })),
});

const ImageComponentSchema = z.object({
  kind: z.literal('image'),
  url: z.string(),
  alt: z.string().optional(),
});

const RatingComponentSchema = z.object({
  kind: z.literal('rating'),
  value: z.number(),
  of: z.number(),
});

const CardComponentSchema = z.object({
  kind: z.literal('card'),
  title: z.string(),
  body: z.string(),
});

const FormComponentSchema = z.object({
  kind: z.literal('form'),
  fields: z.array(FieldSpecSchema),
});

const ClockComponentSchema = z.object({
  kind: z.literal('clock'),
  label: z.string().optional(),
  timezone: z.string().optional(),
});

const ProgressComponentSchema = z.object({
  kind: z.literal('progress'),
  value: z.number(),
  max: z.number().optional(),
  label: z.string().optional(),
});

const AlertComponentSchema = z.object({
  kind: z.literal('alert'),
  title: z.string().optional(),
  content: z.string(),
  severity: z.enum(['info', 'warning', 'success', 'danger']),
});

// Basic/Content components
const MarkdownComponentSchema = z.object({
  kind: z.literal('markdown'),
  content: z.string(),
});

const CodeBlockComponentSchema = z.object({
  kind: z.literal('code'),
  language: z.string().optional(),
  code: z.string(),
});

const ListComponentSchema = z.object({
  kind: z.literal('list'),
  ordered: z.boolean().optional(),
  items: z.array(z.string()),
});

const TimelineItemSchema = z.object({
  label: z.string(),
  timestamp: z.string().optional(),
  description: z.string().optional(),
});

const TimelineComponentSchema = z.object({
  kind: z.literal('timeline'),
  items: z.array(TimelineItemSchema),
});

const AccordionComponentSchema = z.object({
  kind: z.literal('accordion'),
  items: z.array(z.object({ title: z.string(), content: z.string() })),
});

const TabsComponentSchema = z.object({
  kind: z.literal('tabs'),
  tabs: z.array(z.object({ label: z.string(), content: z.string() })),
});

const ChipsComponentSchema = z.object({
  kind: z.literal('chips'),
  chips: z.array(z.object({ label: z.string(), color: z.string().optional() })),
});

const AvatarListComponentSchema = z.object({
  kind: z.literal('avatarList'),
  avatars: z.array(z.object({ name: z.string(), src: z.string().optional() })),
});

const TooltipComponentSchema = z.object({
  kind: z.literal('tooltip'),
  label: z.string(),
  text: z.string(),
});

const DividerComponentSchema = z.object({
  kind: z.literal('divider'),
  inset: z.boolean().optional(),
  text: z.string().optional(),
});

const StepperTabsComponentSchema = z.object({
  kind: z.literal('stepperTabs'),
  steps: z.array(z.object({ label: z.string(), content: z.string() })),
});

// Data/Info
const StatCounterComponentSchema = z.object({
  kind: z.literal('statCounter'),
  label: z.string().optional(),
  value: z.number(),
  suffix: z.string().optional(),
});

const KPICardComponentSchema = z.object({
  kind: z.literal('kpiCard'),
  title: z.string(),
  value: z.union([z.string(), z.number()]),
  change: z.number().optional(),
});

const SparklineComponentSchema = z.object({
  kind: z.literal('sparkline'),
  data: z.array(z.number()),
  width: z.number().optional(),
  height: z.number().optional(),
});

const GaugeComponentSchema = z.object({
  kind: z.literal('gauge'),
  value: z.number(),
  min: z.number().optional(),
  max: z.number().optional(),
});

const HeatmapComponentSchema = z.object({
  kind: z.literal('heatmap'),
  values: z.array(z.array(z.number())),
  rowLabels: z.array(z.string()).optional(),
  colLabels: z.array(z.string()).optional(),
});

const CalendarComponentSchema = z.object({
  kind: z.literal('calendar'),
  selectedDate: z.string().optional(),
});

const TimelineChartComponentSchema = z.object({
  kind: z.literal('timelineChart'),
  points: z.array(z.object({ t: z.union([z.string(), z.number()]), v: z.number() })),
  width: z.number().optional(),
  height: z.number().optional(),
});

const TreeNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({ name: z.string(), value: z.number().optional(), children: z.array(TreeNodeSchema).optional() })
)

const TreemapComponentSchema = z.object({
  kind: z.literal('treemap'),
  root: TreeNodeSchema,
  width: z.number().optional(),
  height: z.number().optional(),
});

const TreeViewerComponentSchema = z.object({
  kind: z.literal('treeViewer'),
  root: TreeNodeSchema,
});

const JsonViewerComponentSchema = z.object({
  kind: z.literal('jsonViewer'),
  data: z.unknown(),
});

// Forms/Inputs
const SliderComponentSchema = z.object({
  kind: z.literal('slider'),
  label: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  value: z.number().optional(),
});

const SwitchComponentSchema = z.object({
  kind: z.literal('switch'),
  label: z.string(),
  checked: z.boolean().optional(),
});

const DateTimePickerComponentSchema = z.object({
  kind: z.literal('dateTimePicker'),
  label: z.string().optional(),
  value: z.string().optional(),
});

const UploadComponentSchema = z.object({
  kind: z.literal('upload'),
  label: z.string().optional(),
  accept: z.string().optional(),
});

const RichTextComponentSchema = z.object({
  kind: z.literal('richText'),
  content: z.string().optional(),
});

const ColorPickerComponentSchema = z.object({
  kind: z.literal('colorPicker'),
  label: z.string().optional(),
  value: z.string().optional(),
});

const RatingInputComponentSchema = z.object({
  kind: z.literal('ratingInput'),
  label: z.string().optional(),
  value: z.number().optional(),
  max: z.number().optional(),
});

const SegmentedControlComponentSchema = z.object({
  kind: z.literal('segmentedControl'),
  options: z.array(z.string()),
  value: z.string().optional(),
});

const MultiSelectComponentSchema = z.object({
  kind: z.literal('multiSelect'),
  label: z.string().optional(),
  options: z.array(z.string()),
  values: z.array(z.string()).optional(),
});

const ChipInputComponentSchema = z.object({
  kind: z.literal('chipInput'),
  label: z.string().optional(),
  values: z.array(z.string()).optional(),
});

// Media
const VideoEmbedComponentSchema = z.object({
  kind: z.literal('video'),
  src: z.string(),
  controls: z.boolean().optional(),
});

const AudioPlayerComponentSchema = z.object({
  kind: z.literal('audio'),
  src: z.string(),
  controls: z.boolean().optional(),
});

const ImageGalleryComponentSchema = z.object({
  kind: z.literal('imageGallery'),
  images: z.array(z.object({ url: z.string(), alt: z.string().optional() })),
});

const CarouselComponentSchema = z.object({
  kind: z.literal('mediaCarousel'),
  items: z.array(z.object({ url: z.string(), alt: z.string().optional() })),
});

const QRCodeComponentSchema = z.object({
  kind: z.literal('qr'),
  text: z.string(),
});

const BarcodeComponentSchema = z.object({
  kind: z.literal('barcode'),
  text: z.string(),
});

// Feedback
const SnackbarComponentSchema = z.object({
  kind: z.literal('snackbar'),
  message: z.string(),
  color: z.enum(['success', 'danger', 'warning', 'neutral']).optional(),
});

const ModalComponentSchema = z.object({
  kind: z.literal('modal'),
  title: z.string().optional(),
  content: z.string(),
});

const DrawerComponentSchema = z.object({
  kind: z.literal('drawer'),
  side: z.enum(['left', 'right', 'top', 'bottom']).optional(),
  content: z.string(),
});

const SkeletonComponentSchema = z.object({
  kind: z.literal('skeleton'),
  width: z.number().optional(),
  height: z.number().optional(),
});

const ProgressCircularComponentSchema = z.object({
  kind: z.literal('progressCircular'),
  value: z.number().optional(),
});

const EmptyStateComponentSchema = z.object({
  kind: z.literal('emptyState'),
  title: z.string(),
  description: z.string().optional(),
});

// Layout/UI
const HeroComponentSchema = z.object({
  kind: z.literal('hero'),
  title: z.string(),
  subtitle: z.string().optional(),
  cta: z.object({ label: z.string(), href: z.string().optional() }).optional(),
});

const CardGridComponentSchema = z.object({
  kind: z.literal('cardGrid'),
  items: z.array(z.object({ title: z.string(), body: z.string() })),
  columns: z.number().optional(),
});

const StatGridComponentSchema = z.object({
  kind: z.literal('statGrid'),
  items: z.array(z.object({ label: z.string(), value: z.union([z.string(), z.number()]) })),
  columns: z.number().optional(),
});

const GridListComponentSchema = z.object({
  kind: z.literal('gridList'),
  items: z.array(z.object({ title: z.string(), subtitle: z.string().optional() })),
});

const MasonryComponentSchema = z.object({
  kind: z.literal('masonry'),
  items: z.array(z.object({ content: z.string() })),
});

const SplitViewComponentSchema = z.object({
  kind: z.literal('splitView'),
  left: z.string(),
  right: z.string(),
  ratio: z.number().optional(),
});

// Maps/Geo advanced overlays
const MapAdvancedComponentSchema = z.object({
  kind: z.literal('mapAdvanced'),
  center: z.object({ lat: z.number(), lng: z.number() }),
  zoom: z.number().optional(),
  polylines: z.array(z.object({ points: z.array(z.object({ lat: z.number(), lng: z.number() })), color: z.string().optional() })).optional(),
  polygons: z.array(z.object({ points: z.array(z.object({ lat: z.number(), lng: z.number() })), color: z.string().optional(), fillColor: z.string().optional() })).optional(),
  heatpoints: z.array(z.object({ lat: z.number(), lng: z.number(), intensity: z.number().optional() })).optional(),
  miniMap: z.boolean().optional(),
});

// Integrations
const IframeComponentSchema = z.object({
  kind: z.literal('iframe'),
  url: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const GistEmbedComponentSchema = z.object({
  kind: z.literal('gist'),
  gistId: z.string(),
});

const MermaidComponentSchema = z.object({
  kind: z.literal('mermaid'),
  code: z.string(),
});

const NetworkGraphComponentSchema = z.object({
  kind: z.literal('networkGraph'),
  nodes: z.array(z.object({ id: z.string() })),
  links: z.array(z.object({ source: z.string(), target: z.string() })),
});

// Tabular data - simple table
const TableComponentSchema = z.object({
  kind: z.literal('table'),
  headers: z.array(z.string()),
  // rows made of primitive cell values rendered as strings
  rows: z.array(z.array(z.union([z.string(), z.number(), z.boolean()]))),
});

// Data grid - richer table with column definitions
const DataGridComponentSchema = z.object({
  kind: z.literal('datagrid'),
  columns: z.array(
    z.object({
      field: z.string(),
      headerName: z.string().optional(),
      width: z.number().optional(),
    })
  ),
  // Each row can be an object with arbitrary fields; `id` recommended
  rows: z.array(
    z.object({ id: z.union([z.string(), z.number()]).optional() }).catchall(
      z.union([z.string(), z.number(), z.boolean()])
    )
  ),
  pageSize: z.number().optional(),
  height: z.number().optional(),
});

// Map with optional markers - uses a keyless tiles library in the UI
const MapComponentSchema = z.object({
  kind: z.literal('map'),
  center: z.object({ lat: z.number(), lng: z.number() }),
  zoom: z.number().optional(),
  markers: z
    .array(z.object({ lat: z.number(), lng: z.number(), label: z.string().optional() }))
    .optional(),
  height: z.number().optional(),
});

export const ComponentSpecSchema = z.union([
  TextComponentSchema,
  ImageComponentSchema,
  RatingComponentSchema,
  CardComponentSchema,
  FormComponentSchema,
  ChartComponentSchema,
  ClockComponentSchema,
  ProgressComponentSchema,
  AlertComponentSchema,
  MarkdownComponentSchema,
  CodeBlockComponentSchema,
  ListComponentSchema,
  TimelineComponentSchema,
  AccordionComponentSchema,
  TabsComponentSchema,
  ChipsComponentSchema,
  AvatarListComponentSchema,
  TooltipComponentSchema,
  DividerComponentSchema,
  StepperTabsComponentSchema,
  // Data/Info
  StatCounterComponentSchema,
  KPICardComponentSchema,
  SparklineComponentSchema,
  GaugeComponentSchema,
  HeatmapComponentSchema,
  CalendarComponentSchema,
  TimelineChartComponentSchema,
  TreemapComponentSchema,
  TreeViewerComponentSchema,
  JsonViewerComponentSchema,
  // Forms/Inputs
  SliderComponentSchema,
  SwitchComponentSchema,
  DateTimePickerComponentSchema,
  UploadComponentSchema,
  RichTextComponentSchema,
  ColorPickerComponentSchema,
  RatingInputComponentSchema,
  SegmentedControlComponentSchema,
  MultiSelectComponentSchema,
  ChipInputComponentSchema,
  // Media
  VideoEmbedComponentSchema,
  AudioPlayerComponentSchema,
  ImageGalleryComponentSchema,
  CarouselComponentSchema,
  QRCodeComponentSchema,
  BarcodeComponentSchema,
  // Feedback
  SnackbarComponentSchema,
  ModalComponentSchema,
  DrawerComponentSchema,
  SkeletonComponentSchema,
  ProgressCircularComponentSchema,
  EmptyStateComponentSchema,
  // Layout/UI
  HeroComponentSchema,
  CardGridComponentSchema,
  StatGridComponentSchema,
  GridListComponentSchema,
  MasonryComponentSchema,
  SplitViewComponentSchema,
  MapAdvancedComponentSchema,
  IframeComponentSchema,
  GistEmbedComponentSchema,
  MermaidComponentSchema,
  NetworkGraphComponentSchema,
  // Interactive
  z.object({ kind: z.literal('canvasPad'), width: z.number().optional(), height: z.number().optional() }),
  z.object({ kind: z.literal('signaturePad'), width: z.number().optional(), height: z.number().optional() }),
  z.object({ kind: z.literal('emojiPicker') }),
  z.object({ kind: z.literal('draggableList'), items: z.array(z.string()) }),
  z.object({ kind: z.literal('sortableTable'), headers: z.array(z.string()), rows: z.array(z.array(z.string())) }),
  z.object({ kind: z.literal('collapsibleTree'), root: TreeNodeSchema }),
  z.object({ kind: z.literal('commandPalette'), commands: z.array(z.object({ id: z.string(), title: z.string() })) }),
  TableComponentSchema,
  DataGridComponentSchema,
  MapComponentSchema,
])

export const AIResponseSchema = z.object({
  topline: z.string(),
  layout: z.enum(['stack', 'grid', 'carousel', 'modal']),
  components: z.array(ComponentSpecSchema),
})

// Type exports
export type FieldSpec = z.infer<typeof FieldSpecSchema>
export type ComponentSpec = z.infer<typeof ComponentSpecSchema>
export type AIResponse = z.infer<typeof AIResponseSchema>

// Database types
export interface User {
  id: string
  email: string
  plan: 'free' | 'pro'
  messages_sent: number
  period_start: string
  created_at: string
  updated_at: string
  is_superuser: boolean
}

export interface ChatMessage {
  id: string
  user_id: string | null
  prompt: string
  response: AIResponse
  created_at: string
}

// Usage tracking
export interface UsageQuota {
  used: number
  limit: number
  resetDate?: Date
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export interface ChatResponse extends ApiResponse<AIResponse> {
  quota?: UsageQuota
}
