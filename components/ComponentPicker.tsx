'use client'

import React, { useState } from 'react'
import Box from '@mui/joy/Box'
import Autocomplete from '@mui/joy/Autocomplete'
import Chip from '@mui/joy/Chip'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import Typography from '@mui/joy/Typography'
import Switch from '@mui/joy/Switch'
import Tooltip from '@mui/joy/Tooltip'
import WidgetsIcon from '@mui/icons-material/Widgets'
import TableChartIcon from '@mui/icons-material/TableChart'
import MapIcon from '@mui/icons-material/Map'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import ImageIcon from '@mui/icons-material/Image'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import TimelineIcon from '@mui/icons-material/Timeline'
import SchemaIcon from '@mui/icons-material/Schema'
import CodeIcon from '@mui/icons-material/Code'
import SlideshowIcon from '@mui/icons-material/Slideshow'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import VideocamIcon from '@mui/icons-material/Videocam'
import ListAltIcon from '@mui/icons-material/ListAlt'
import TabIcon from '@mui/icons-material/Tab'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import FaceIcon from '@mui/icons-material/Face'
import InfoIcon from '@mui/icons-material/Info'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import GradingIcon from '@mui/icons-material/Grading'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LinearScaleIcon from '@mui/icons-material/LinearScale'
import StarIcon from '@mui/icons-material/Star'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import SpeedIcon from '@mui/icons-material/Speed'
import GridOnIcon from '@mui/icons-material/GridOn'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ViewComfyIcon from '@mui/icons-material/ViewComfy'
import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import SplitscreenIcon from '@mui/icons-material/Splitscreen'
import TuneIcon from '@mui/icons-material/Tune'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import UploadIcon from '@mui/icons-material/Upload'
import PaletteIcon from '@mui/icons-material/Palette'
import SegmentIcon from '@mui/icons-material/Segment'
import ChecklistIcon from '@mui/icons-material/Checklist'
import CollectionsIcon from '@mui/icons-material/Collections'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import NotificationsIcon from '@mui/icons-material/Notifications'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import MenuIcon from '@mui/icons-material/Menu'
import ViewStreamIcon from '@mui/icons-material/ViewStream'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import LayersIcon from '@mui/icons-material/Layers'
import GestureIcon from '@mui/icons-material/Gesture'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import TableRowsIcon from '@mui/icons-material/TableRows'
import TerminalIcon from '@mui/icons-material/Terminal'
import LanguageIcon from '@mui/icons-material/Language'
import HubIcon from '@mui/icons-material/Hub'

export type ComponentKind = string

export interface PickerOption {
  label: string
  kind: ComponentKind
  category: string
  Icon: React.ElementType
  description?: string
}

const options: PickerOption[] = [
  // Content
  { label: 'Text', kind: 'text', category: 'Content', Icon: TextFieldsIcon, description: 'Simple paragraph text' },
  { label: 'Markdown', kind: 'markdown', category: 'Content', Icon: TextFieldsIcon, description: 'Render markdown content' },
  { label: 'Code', kind: 'code', category: 'Content', Icon: CodeIcon, description: 'Syntax highlighted code' },
  { label: 'List', kind: 'list', category: 'Content', Icon: ListAltIcon, description: 'Bulleted or numbered list' },
  { label: 'Timeline', kind: 'timeline', category: 'Content', Icon: TimelineIcon, description: 'Sequence of labeled steps' },
  { label: 'Accordion', kind: 'accordion', category: 'Content', Icon: UnfoldMoreIcon, description: 'Expandable Q&A sections' },
  { label: 'Tabs', kind: 'tabs', category: 'Content', Icon: TabIcon, description: 'Tabbed content areas' },
  { label: 'Chips', kind: 'chips', category: 'Content', Icon: LocalOfferIcon, description: 'Tag-like labels' },
  { label: 'Avatar List', kind: 'avatarList', category: 'Content', Icon: FaceIcon, description: 'People/avatars in a row' },
  { label: 'Tooltip', kind: 'tooltip', category: 'Content', Icon: InfoIcon, description: 'Hover label with hint text' },
  { label: 'Divider', kind: 'divider', category: 'Content', Icon: HorizontalRuleIcon, description: 'Horizontal separator line' },
  { label: 'Stepper Tabs', kind: 'stepperTabs', category: 'Content', Icon: GradingIcon, description: 'Multi-step navigation' },
  { label: 'Card', kind: 'card', category: 'Content', Icon: ViewListIcon, description: 'Title and body card' },
  { label: 'Rating (display)', kind: 'rating', category: 'Content', Icon: StarIcon, description: 'Read-only star rating' },
  { label: 'Clock', kind: 'clock', category: 'Content', Icon: AccessTimeIcon, description: 'Current time for a timezone' },
  { label: 'Progress', kind: 'progress', category: 'Content', Icon: LinearScaleIcon, description: 'Linear progress bar' },

  // Data/Visualizations (rich set)
  { label: 'Stat Counter', kind: 'statCounter', category: 'Data', Icon: InsertChartIcon, description: 'Large numeric value with label' },
  { label: 'KPI Card', kind: 'kpiCard', category: 'Data', Icon: InsertChartIcon, description: 'Title, value, and change' },
  { label: 'Sparkline', kind: 'sparkline', category: 'Data', Icon: ShowChartIcon, description: 'Mini trend line chart' },
  { label: 'Gauge', kind: 'gauge', category: 'Data', Icon: SpeedIcon, description: 'Dial gauge progress' },
  { label: 'Heatmap', kind: 'heatmap', category: 'Data', Icon: GridOnIcon, description: 'Matrix of values with colors' },
  { label: 'Calendar', kind: 'calendar', category: 'Data', Icon: CalendarMonthIcon, description: 'Day/month view with selected date' },
  { label: 'Timeline Chart', kind: 'timelineChart', category: 'Data', Icon: TimelineIcon, description: 'Series of (t, v) points' },
  { label: 'Treemap', kind: 'treemap', category: 'Data', Icon: ViewComfyIcon, description: 'Hierarchical rectangles' },
  { label: 'Tree Viewer', kind: 'treeViewer', category: 'Data', Icon: SchemaIcon, description: 'Indented hierarchical view' },
  { label: 'JSON Viewer', kind: 'jsonViewer', category: 'Data', Icon: CodeIcon, description: 'Formatted JSON object' },
  { label: 'Data Grid', kind: 'datagrid', category: 'Data', Icon: TableChartIcon, description: 'Sortable, paged table' },
  { label: 'Table', kind: 'table', category: 'Data', Icon: TableChartIcon, description: 'Simple rows and columns' },
  { label: 'Chart (basic)', kind: 'chart', category: 'Data', Icon: InsertChartIcon, description: 'Simple bar/line/pie' },

  // Media
  { label: 'Image', kind: 'image', category: 'Media', Icon: ImageIcon, description: 'Single image by URL' },
  { label: 'Video', kind: 'video', category: 'Media', Icon: VideocamIcon, description: 'Video element by src' },
  { label: 'Audio', kind: 'audio', category: 'Media', Icon: MusicNoteIcon, description: 'Audio player by src' },
  { label: 'Image Gallery', kind: 'imageGallery', category: 'Media', Icon: CollectionsIcon, description: 'Grid of images' },
  { label: 'Media Carousel', kind: 'mediaCarousel', category: 'Media', Icon: ViewCarouselIcon, description: 'Slide images horizontally' },
  { label: 'QR Code', kind: 'qr', category: 'Media', Icon: QrCode2Icon, description: 'Generate QR from text' },
  { label: 'Barcode', kind: 'barcode', category: 'Media', Icon: QrCodeScannerIcon, description: 'Generate 1D barcode' },

  // Maps
  { label: 'Map', kind: 'map', category: 'Maps', Icon: MapIcon, description: 'Center/zoom with markers' },
  { label: 'Advanced Map', kind: 'mapAdvanced', category: 'Maps', Icon: LayersIcon, description: 'Polylines/polygons/heat-points' },

  // Layout/UI
  { label: 'Hero', kind: 'hero', category: 'Layout', Icon: RocketLaunchIcon, description: 'Title, subtitle, CTA' },
  { label: 'Card Grid', kind: 'cardGrid', category: 'Layout', Icon: ViewQuiltIcon, description: 'Grid of cards' },
  { label: 'Stat Grid', kind: 'statGrid', category: 'Layout', Icon: GridViewIcon, description: 'Grid of stats' },
  { label: 'Grid List', kind: 'gridList', category: 'Layout', Icon: ViewListIcon, description: 'List of items in grid' },
  { label: 'Masonry', kind: 'masonry', category: 'Layout', Icon: ViewModuleIcon, description: 'Variable-height grid' },
  { label: 'Split View', kind: 'splitView', category: 'Layout', Icon: SplitscreenIcon, description: 'Two panels left/right' },

  // Forms/Inputs
  { label: 'Form', kind: 'form', category: 'Forms', Icon: TextFieldsIcon, description: 'Fields submit back to AI' },
  { label: 'Slider', kind: 'slider', category: 'Forms', Icon: TuneIcon, description: 'Numeric slider input' },
  { label: 'Switch', kind: 'switch', category: 'Forms', Icon: ToggleOnIcon, description: 'On/off toggle input' },
  { label: 'Date Time', kind: 'dateTimePicker', category: 'Forms', Icon: CalendarMonthIcon, description: 'Pick date & time' },
  { label: 'Upload', kind: 'upload', category: 'Forms', Icon: UploadIcon, description: 'File upload input' },
  { label: 'Rich Text', kind: 'richText', category: 'Forms', Icon: TextFieldsIcon, description: 'WYSIWYG editor' },
  { label: 'Color Picker', kind: 'colorPicker', category: 'Forms', Icon: PaletteIcon, description: 'Select a color' },
  { label: 'Rating Input', kind: 'ratingInput', category: 'Forms', Icon: StarIcon, description: 'Interactive star rating' },
  { label: 'Segmented Control', kind: 'segmentedControl', category: 'Forms', Icon: SegmentIcon, description: 'Choose one of several' },
  { label: 'Multi Select', kind: 'multiSelect', category: 'Forms', Icon: ChecklistIcon, description: 'Choose multiple options' },
  { label: 'Chip Input', kind: 'chipInput', category: 'Forms', Icon: LocalOfferIcon, description: 'Tag entry input' },

  // Feedback
  { label: 'Snackbar', kind: 'snackbar', category: 'Feedback', Icon: NotificationsIcon, description: 'Transient toast message' },
  { label: 'Alert', kind: 'alert', category: 'Feedback', Icon: WarningAmberIcon, description: 'Inline notice' },
  { label: 'Modal', kind: 'modal', category: 'Feedback', Icon: OpenInFullIcon },
  { label: 'Drawer', kind: 'drawer', category: 'Feedback', Icon: MenuIcon },
  { label: 'Skeleton', kind: 'skeleton', category: 'Feedback', Icon: ViewStreamIcon },
  { label: 'Progress Circular', kind: 'progressCircular', category: 'Feedback', Icon: DonutLargeIcon },
  { label: 'Empty State', kind: 'emptyState', category: 'Feedback', Icon: HourglassEmptyIcon },

  // Interactive
  { label: 'Canvas Pad', kind: 'canvasPad', category: 'Interactive', Icon: GestureIcon, description: 'Freehand drawing canvas' },
  { label: 'Signature Pad', kind: 'signaturePad', category: 'Interactive', Icon: GestureIcon, description: 'Sign using pointer' },
  { label: 'Emoji Picker', kind: 'emojiPicker', category: 'Interactive', Icon: EmojiEmotionsIcon, description: 'Choose emojis' },
  { label: 'Draggable List', kind: 'draggableList', category: 'Interactive', Icon: DragIndicatorIcon, description: 'Reorder list by drag' },
  { label: 'Sortable Table', kind: 'sortableTable', category: 'Interactive', Icon: TableRowsIcon, description: 'Sortable rows by drag' },
  { label: 'Collapsible Tree', kind: 'collapsibleTree', category: 'Interactive', Icon: SchemaIcon, description: 'Expand/collapse hierarchy' },
  { label: 'Command Palette', kind: 'commandPalette', category: 'Interactive', Icon: TerminalIcon, description: 'Quick commands UI' },

  // Integrations
  { label: 'iFrame', kind: 'iframe', category: 'Integrations', Icon: LanguageIcon, description: 'Embed external pages' },
  { label: 'Gist', kind: 'gist', category: 'Integrations', Icon: CodeIcon, description: 'Embed GitHub gist' },
  { label: 'Mermaid', kind: 'mermaid', category: 'Integrations', Icon: InsertChartIcon, description: 'Flowcharts/diagrams' },
  { label: 'Network Graph', kind: 'networkGraph', category: 'Integrations', Icon: HubIcon, description: 'Nodes and links graph' },
]

export default function ComponentPicker({
  selected,
  onChange,
  onToggleSearch,
  forceWebSearch,
}: {
  selected: ComponentKind | null
  onChange: (kind: ComponentKind | null) => void
  onToggleSearch?: (enabled: boolean) => void
  forceWebSearch?: boolean
}) {
  const [localForce, setLocalForce] = useState<boolean>(!!forceWebSearch)
  return (
    <Box sx={{ mb: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Autocomplete
        size="md"
        placeholder="Pick a component to force in the next reply"
        options={options}
        value={options.find((o) => o.kind === selected) || null}
        getOptionLabel={(o) => o.label}
        groupBy={(o) => o.category}
        onChange={(_, value) => onChange(value ? value.kind : null)}
        startDecorator={<WidgetsIcon />}
        renderOption={(props, option) => {
          const { ownerState, ...liProps } = (props as any)
          return (
          <li
            {...liProps}
            style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBlock: 8 }}
          >
            <ListItemDecorator sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              <option.Icon fontSize="small" />
            </ListItemDecorator>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
              <Typography level="body-sm">{option.label}</Typography>
              {option.description && (
                <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                  {option.description}
                </Typography>
              )}
            </Box>
          </li>
          )
        }}
        sx={{
          '--Autocomplete-indicatorColor': 'var(--joy-palette-primary-500)',
          backgroundColor: 'background.level1',
          borderRadius: '12px',
          border: '1px solid',
          borderColor: 'neutral.outlinedBorder',
        }}
      />
      {selected && (
        <Chip color="primary" variant="soft" sx={{ mt: 1 }}>
          Forced component: {selected}
        </Chip>
      )}
      {onToggleSearch && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
          <Tooltip title="Use web search to fetch live data for the next reply">
            <Switch
              checked={localForce}
              onChange={(e) => {
                setLocalForce(e.target.checked)
                onToggleSearch?.(e.target.checked)
              }}
              color="primary"
            />
          </Tooltip>
          <Typography level="body-sm">Always use web search for next message</Typography>
        </Box>
      )}
    </Box>
  )
}


