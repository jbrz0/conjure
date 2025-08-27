'use client'

import React, { useState } from 'react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export interface DraggableListProps { items: string[] }

const SortableItem: React.FC<{ id: string }> = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition, padding: 8, borderRadius: 6, background: 'rgba(255,255,255,0.06)', marginBottom: 8 }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  )
}

export const DraggableList: React.FC<DraggableListProps> = ({ items }) => {
  const [list, setList] = useState(items)
  const sensors = useSensors(useSensor(PointerSensor))
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={({ active, over }) => {
      if (!over || active.id === over.id) return
      const oldIndex = list.indexOf(String(active.id))
      const newIndex = list.indexOf(String(over.id))
      setList(arrayMove(list, oldIndex, newIndex))
    }}>
      <SortableContext items={list} strategy={verticalListSortingStrategy}>
        {list.map((id) => <SortableItem key={id} id={id} />)}
      </SortableContext>
    </DndContext>
  )
}


