// components/ComparisonTable.tsx
'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

const comparisonData = [
  { feature: 'Qubit Type', QDaria: 'Topological (Fibonacci Anyons)', Google: 'Superconducting', IBM: 'Superconducting', IonQ: 'Trapped Ion' },
  { feature: 'Error Rate', QDaria: '< 0.1%', Google: '~0.5%', IBM: '~1%', IonQ: '~0.5%' },
  { feature: 'Coherence Time', QDaria: '> 1 ms', Google: '~100 μs', IBM: '~100 μs', IonQ: '~1 s' },
  { feature: 'Scalability', QDaria: 'High', Google: 'Medium', IBM: 'Medium', IonQ: 'Medium' },
  { feature: 'Operating Temperature', QDaria: '~4K (potential for room temp)', Google: '~15 mK', IBM: '~15 mK', IonQ: 'Room temperature' },
  { feature: 'Gate Fidelity', QDaria: '> 99.9%', Google: '~99.5%', IBM: '~99%', IonQ: '~99.5%' },
]

export default function ComparisonTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Feature</TableHead>
          <TableHead>QDaria</TableHead>
          <TableHead>Google</TableHead>
          <TableHead>IBM</TableHead>
          <TableHead>IonQ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {comparisonData.map((row) => (
          <TableRow key={row.feature}>
            <TableCell className="font-medium">{row.feature}</TableCell>
            <TableCell>{row.QDaria}</TableCell>
            <TableCell>{row.Google}</TableCell>
            <TableCell>{row.IBM}</TableCell>
            <TableCell>{row.IonQ}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
