'use client'

import React from 'react'
import Image from 'next/image'
import { AIResponse, ComponentSpec } from '@/lib/types'
import { DynamicForm } from './DynamicForm'
import { DynamicChart } from './DynamicChart'
import { DynamicClock } from './DynamicClock'
import { DynamicProgress } from './DynamicProgress'
import { DynamicAlert } from './DynamicAlert'
import { DynamicTable } from './DynamicTable'
import { DynamicDataGrid } from './DynamicDataGrid'
import { DynamicMap } from './DynamicMap'
import { DynamicMarkdown } from './content/DynamicMarkdown'
import { DynamicCode } from './content/DynamicCode'
import { DynamicList } from './content/DynamicList'
import { DynamicTimeline } from './content/DynamicTimeline'
import { DynamicAccordion } from './content/DynamicAccordion'
import { DynamicTabs } from './content/DynamicTabs'
import { DynamicChips } from './content/DynamicChips'
import { DynamicAvatarList } from './content/DynamicAvatarList'
import { DynamicTooltip } from './content/DynamicTooltip'
import { DynamicDivider } from './content/DynamicDivider'
import { DynamicStepperTabs } from './content/DynamicStepperTabs'
import { StatCounter } from './data/StatCounter'
import { KPICard } from './data/KPICard'
import { Sparkline } from './data/Sparkline'
import { Gauge } from './data/Gauge'
import { Heatmap } from './data/Heatmap'
import { CalendarView } from './data/CalendarView'
import { TimelineChart } from './data/TimelineChart'
import { TreemapView } from './data/TreemapView'
import { TreeViewer } from './data/TreeViewer'
import { JsonViewer } from './data/JsonViewer'
import { SliderInput } from './forms/SliderInput'
import { SwitchInput } from './forms/SwitchInput'
import { DateTimePickerInput } from './forms/DateTimePickerInput'
import { UploadInput } from './forms/UploadInput'
import { RichTextEditor } from './forms/RichTextEditor'
import { ColorPicker } from './forms/ColorPicker'
import { RatingInput } from './forms/RatingInput'
import { SegmentedControl } from './forms/SegmentedControl'
import { MultiSelect } from './forms/MultiSelect'
import { ChipInput } from './forms/ChipInput'
import { VideoEmbed } from './media/VideoEmbed'
import { AudioPlayer } from './media/AudioPlayer'
import { ImageGallery } from './media/ImageGallery'
import { MediaCarousel } from './media/MediaCarousel'
import { QRCodeView } from './media/QRCodeView'
import { BarcodeView } from './media/BarcodeView'
import { SnackbarView } from './feedback/SnackbarView'
import { ModalDialogView } from './feedback/ModalDialogView'
import { DrawerSheet } from './feedback/DrawerSheet'
import { SkeletonLoader } from './feedback/SkeletonLoader'
import { ProgressCircular } from './feedback/ProgressCircular'
import { EmptyState } from './feedback/EmptyState'
import { Hero } from './layout/Hero'
import { CardGrid } from './layout/CardGrid'
import { StatGrid } from './layout/StatGrid'
import { GridList } from './layout/GridList'
import { MasonryView } from './layout/MasonryView'
import { SplitView } from './layout/SplitView'
import { CanvasPad } from './interactive/CanvasPad'
import { SignaturePadView } from './interactive/SignaturePadView'
import { EmojiPickerView } from './interactive/EmojiPickerView'
import { DraggableList } from './interactive/DraggableList'
import { SortableTable } from './interactive/SortableTable'
import { CollapsibleTree } from './interactive/CollapsibleTree'
import { CommandPalette } from './interactive/CommandPalette'
import { MapAdvanced } from './maps/MapAdvanced'
import { IframeEmbed } from './integrations/IframeEmbed'
import { GistEmbed } from './integrations/GistEmbed'
import { MermaidView } from './integrations/MermaidView'
import { NetworkGraph } from './integrations/NetworkGraph'
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface RendererProps {
  response: AIResponse
  onFormSubmit: (formData: Record<string, string>) => void
}

const renderComponent = (
  component: ComponentSpec,
  onFormSubmit: (formData: Record<string, string>) => void
) => {
  switch (component.kind) {
    case 'text':
      return <Typography>{component.content}</Typography>

    case 'image':
      return (
        <Image
          src={component.url}
          alt={component.alt || 'generated image'}
          width={400}
          height={300}
          className="rounded-lg max-w-full h-auto"
        />
      )

    case 'rating': {
      const filled = Math.max(0, Math.min(component.value, component.of))
      const empty = Math.max(0, component.of - filled)
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex' }}>
            {Array.from({ length: filled }).map((_, i) => (
              <StarIcon key={`f-${i}`} sx={{ color: 'warning.400' }} />
            ))}
            {Array.from({ length: empty }).map((_, i) => (
              <StarBorderIcon key={`e-${i}`} sx={{ color: 'neutral.500' }} />
            ))}
          </Box>
          <Typography>{component.value} / {component.of}</Typography>
        </Box>
      )
    }

    case 'clock':
      return <DynamicClock {...component} />

    case 'progress':
      return <DynamicProgress {...component} />

    case 'alert':
      return <DynamicAlert {...component} />

    // Basic/Content
    case 'markdown':
      return <DynamicMarkdown content={component.content} />
    case 'code':
      return <DynamicCode code={component.code} language={component.language} />
    case 'list':
      return <DynamicList items={component.items} ordered={component.ordered} />
    case 'timeline':
      return <DynamicTimeline items={component.items} />
    case 'accordion':
      return <DynamicAccordion items={component.items} />
    case 'tabs':
      return <DynamicTabs tabs={component.tabs} />
    case 'chips':
      return <DynamicChips chips={component.chips} />
    case 'avatarList':
      return <DynamicAvatarList avatars={component.avatars} />
    case 'tooltip':
      return <DynamicTooltip label={component.label} text={component.text} />
    case 'divider':
      return <DynamicDivider inset={component.inset} text={component.text} />
    case 'stepperTabs':
      return <DynamicStepperTabs steps={component.steps} />

    // Data/Info
    case 'statCounter':
      return <StatCounter value={component.value} label={component.label} suffix={component.suffix} />
    case 'kpiCard':
      return <KPICard title={component.title} value={component.value} change={component.change} />
    case 'sparkline':
      return <Sparkline data={component.data} width={component.width} height={component.height} />
    case 'gauge':
      return <Gauge value={component.value} min={component.min} max={component.max} />
    case 'heatmap':
      return <Heatmap values={component.values} rowLabels={component.rowLabels} colLabels={component.colLabels} />
    case 'calendar':
      return <CalendarView selectedDate={component.selectedDate} />
    case 'timelineChart':
      return <TimelineChart points={component.points} width={component.width} height={component.height} />
    case 'treemap':
      return <TreemapView root={component.root} width={component.width} height={component.height} />
    case 'treeViewer':
      return <TreeViewer root={component.root} />
    case 'jsonViewer':
      return <JsonViewer data={component.data} />

    // Forms/Inputs
    case 'slider':
      return <SliderInput {...component} />
    case 'switch':
      return <SwitchInput {...component} />
    case 'dateTimePicker':
      return <DateTimePickerInput {...component} />
    case 'upload':
      return <UploadInput {...component} />
    case 'richText':
      return <RichTextEditor {...component} />
    case 'colorPicker':
      return <ColorPicker {...component} />
    case 'ratingInput':
      return <RatingInput {...component} />
    case 'segmentedControl':
      return <SegmentedControl {...component} />
    case 'multiSelect':
      return <MultiSelect {...component} />
    case 'chipInput':
      return <ChipInput {...component} />

    // Media
    case 'video':
      return <VideoEmbed src={component.src} controls={component.controls} />
    case 'audio':
      return <AudioPlayer src={component.src} controls={component.controls} />
    case 'imageGallery':
      return <ImageGallery images={component.images} />
    case 'mediaCarousel':
      return <MediaCarousel items={component.items} />
    case 'qr':
      return <QRCodeView text={component.text} />
    case 'barcode':
      return <BarcodeView text={component.text} />

    // Feedback
    case 'snackbar':
      return <SnackbarView message={component.message} color={component.color} />
    case 'modal':
      return <ModalDialogView title={component.title} content={component.content} />
    case 'drawer':
      return <DrawerSheet side={component.side} content={component.content} />
    case 'skeleton':
      return <SkeletonLoader width={component.width} height={component.height} />
    case 'progressCircular':
      return <ProgressCircular value={component.value} />
    case 'emptyState':
      return <EmptyState title={component.title} description={component.description} />

    // Layout/UI
    case 'hero':
      return <Hero title={component.title} subtitle={component.subtitle} cta={component.cta} />
    case 'cardGrid':
      return <CardGrid items={component.items} columns={component.columns} />
    case 'statGrid':
      return <StatGrid items={component.items} columns={component.columns} />
    case 'gridList':
      return <GridList items={component.items} />
    case 'masonry':
      return <MasonryView items={component.items} />
    case 'splitView':
      return <SplitView left={component.left} right={component.right} ratio={component.ratio} />

    // Interactive
    case 'canvasPad':
      return <CanvasPad width={component.width} height={component.height} />
    case 'signaturePad':
      return <SignaturePadView width={component.width} height={component.height} />
    case 'emojiPicker':
      return <EmojiPickerView />
    case 'draggableList':
      return <DraggableList items={component.items} />
    case 'sortableTable':
      return <SortableTable headers={component.headers} rows={component.rows} />
    case 'collapsibleTree':
      return <CollapsibleTree root={component.root} />
    case 'commandPalette':
      return <CommandPalette commands={component.commands} />

    // Maps/Geo advanced
    case 'mapAdvanced':
      return <MapAdvanced {...component} />

    // Integrations
    case 'iframe':
      return <IframeEmbed url={component.url} width={component.width} height={component.height} />
    case 'gist':
      return <GistEmbed gistId={component.gistId} />
    case 'mermaid':
      return <MermaidView code={component.code} />
    case 'networkGraph':
      return <NetworkGraph nodes={component.nodes} links={component.links} />

    case 'table':
      return <DynamicTable headers={component.headers} rows={component.rows} />

    case 'datagrid':
      return (
        <DynamicDataGrid
          columns={component.columns}
          rows={component.rows}
          pageSize={component.pageSize}
          height={component.height}
        />
      )

    case 'map':
      return (
        <DynamicMap
          center={component.center}
          zoom={component.zoom}
          markers={component.markers}
          height={component.height}
        />
      )

    case 'card':
      return (
        <Card variant="outlined">
          <Typography level="h4">{component.title}</Typography>
          <Typography>{component.body}</Typography>
        </Card>
      )

    case 'form':
      return <DynamicForm fields={component.fields} onSubmit={onFormSubmit} />

    case 'chart':
      return <DynamicChart data={component.data} width={500} height={300} />

    default:
      // @ts-ignore
      return <Typography color="danger">Unsupported component type: {component.kind}</Typography>
  }
}

export const Renderer: React.FC<RendererProps> = ({ response, onFormSubmit }) => {
  const layoutStyles = {
    stack: { display: 'flex', flexDirection: 'column', gap: 2 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 },
    carousel: { display: 'flex', overflowX: 'auto', gap: 2, p: 1, scrollSnapType: 'x mandatory' },
    modal: {}, // Modal layout would be handled by a parent component
  }

  return (
    <Box sx={{ p: 2 }}>
      {response.topline && <Typography level="h3" component="h1" sx={{ mb: 2 }}>{response.topline}</Typography>}
      <Box sx={layoutStyles[response.layout]}>
        {response.components.map((component, index) => (
          <Box key={index} sx={{ scrollSnapAlign: response.layout === 'carousel' ? 'start' : undefined }}>
            {renderComponent(component, onFormSubmit)}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
