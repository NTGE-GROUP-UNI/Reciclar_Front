import { create } from 'zustand'

interface Scan {
    id: string
    name: string
    timestamp: number
}

interface AttendanceStore {
    recentScans: Scan[]
    addScan: (scan: Scan) => void
}

export const useAttendanceStore = create<AttendanceStore>((set) => ({
    recentScans: [],
    addScan: (scan) =>
        set((state) => ({
            recentScans: [scan, ...state.recentScans].slice(0, 10),
        })),
}))