'use client';
import React from 'react';

// --- TypeScript Interface Definitions ---

// Defines the structure for the time logs object (e.g., { "Mon 23": "3h 30m" })
interface Logs {
    [day: string]: string;
}

// Defines the base structure for a single time log task
interface Task {
    id: string;
    description: string;
    logs: Logs;
}

// Defines the task structure after calculation, including the total minutes
interface ProcessedTask extends Task {
    totalMinutes: number;
}

// --- Data Definition ---
const taskData: Task[] = [
    { id: "PROJ-501", description: "Implement the Jira Timelog Table Component (FE)", logs: { "Mon 23": "3h 30m", "Tue 24": "4h 0m", "Wed 25": "1h 15m", "Thu 26": "—", "Fri 27": "2h 0m" } },
    { id: "PROJ-502", description: "Setup API endpoint for time log data fetching", logs: { "Mon 23": "2h 0m", "Tue 24": "1h 30m", "Wed 25": "2h 30m", "Thu 26": "3h 0m", "Fri 27": "—" } },
    { id: "SUPPORT-112", description: "Investigate production bug with user profile image scaling", logs: { "Mon 23": "—", "Tue 24": "—", "Wed 25": "—", "Thu 26": "1h 30m", "Fri 27": "45m" } },
    { id: "PROJ-503", description: "Refactor auth service for better security", logs: { "Mon 23": "2h 30m", "Tue 24": "—", "Wed 25": "3h 0m", "Thu 26": "1h 0m", "Fri 27": "3h 15m" } },
    { id: "DOCS-10", description: "Update technical documentation for new API", logs: { "Mon 23": "—", "Tue 24": "2h 0m", "Wed 25": "1h 45m", "Thu 26": "—", "Fri 27": "1h 30m" } },
];

const dayHeaders: string[] = taskData.length > 0 ? Object.keys(taskData[0].logs) : [];

/**
 * Converts a time string (e.g., "3h 30m", "45m", "—") into total minutes.
 * @param {string} timeStr - The time string.
 * @returns {number} Total minutes.
 */
function timeToMinutes(timeStr: string): number {
    if (timeStr === '—' || !timeStr) return 0;
    const parts = timeStr.match(/(\d+h)?\s*(\d+m)?/);
    if (!parts) return 0;
    const hours = parts[1] ? parseInt(parts[1].replace('h', '').trim()) : 0;
    const minutes = parts[2] ? parseInt(parts[2].replace('m', '').trim()) : 0;
    return (hours * 60) + minutes;
}

/**
 * Converts total minutes back into a readable time string (e.g., "5h 30m").
 * @param {number} totalMinutes - The total minutes.
 * @returns {string} The formatted time string.
 */
function minutesToTime(totalMinutes: number): string {
    if (totalMinutes === 0) return '—';
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let result = '';
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0 || hours === 0 && totalMinutes > 0) result += `${minutes}m`;
    return result.trim();
}

// --- Main React Component (Typed) ---

const TimeLogTable: React.FC = () => {
    // 1. Calculate Totals (Row and Column)
    let grandTotalMinutes: number = 0;
    const dailyTotals: Logs = dayHeaders.reduce((acc, day) => ({ ...acc, [day]: 0 }), {});

    const processedRows: ProcessedTask[] = taskData.map((task: Task) => {
        let taskTotalMinutes: number = 0;
        
        dayHeaders.forEach((day: string) => {
            const timeStr: string = task.logs[day] || '—';
            const minutes: number = timeToMinutes(timeStr);
            taskTotalMinutes += minutes;
            // The dailyTotals[day] is initialized as a number (0) above, so we cast to number when incrementing.
            dailyTotals[day] = (dailyTotals[day] as unknown as number) + minutes; 
        });
        
        grandTotalMinutes += taskTotalMinutes;
        return { ...task, totalMinutes: taskTotalMinutes };
    });

    // 2. CSV Export Logic
    const exportToCSV = (): void => {
        let csv: string = `Task ID,Description,${dayHeaders.join(',')},Total\n`;

        // Add task rows
        processedRows.forEach((task: ProcessedTask) => {
            const rowLogs: string = dayHeaders.map((day: string) => {
                // Remove commas and quotes from time strings to ensure CSV integrity
                return `"${task.logs[day].replace(/—/g, '')}"`;
            }).join(',');

            // Sanitize description for quotes
            const safeDescription: string = task.description.replace(/"/g, '""');

            csv += `"${task.id}","${safeDescription}",${rowLogs},"${minutesToTime(task.totalMinutes)}"\n`;
        });

        // Add Grand Total row
        const dailyTotalValues: string = dayHeaders.map((day: string) => 
            `"${minutesToTime(dailyTotals[day] as unknown as number)}"`
        ).join(',');
        
        csv += `"GRAND TOTAL",,"${dailyTotalValues}","${minutesToTime(grandTotalMinutes)}"\n`;

        // Download logic
        const blob: Blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link: HTMLAnchorElement = document.createElement('a');
        if (link.download !== undefined) {
            const url: string = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'time_log_export.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="bg-[#F8F9FA] min-h-screen p-4 sm:p-8 font-sans">
            <div id="app" className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] mb-2">Weekly Time Log</h1>
                    <p className="text-lg text-[#42526E]">Review and export time spent across tasks for the week.</p>
                </header>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    {/* Responsive Table Container */}
                    <div className="block w-full overflow-x-auto whitespace-nowrap">
                        <table className="min-w-full divide-y divide-gray-200">
                            {/* Table Header */}
                            <thead className="bg-[#F4F5F7] sticky top-0 z-10">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#42526E] uppercase tracking-wider min-w-[250px]">
                                        Task Details
                                    </th>
                                    {dayHeaders.map((day: string) => (
                                        <th key={day} scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#42526E] uppercase tracking-wider min-w-[80px]">
                                            {day}
                                        </th>
                                    ))}
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-[#0052CC] uppercase tracking-wider bg-soft-gray/50 min-w-[100px]">
                                        TOTAL
                                    </th>
                                </tr>
                            </thead>
                            
                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-100">
                                {processedRows.map((task: ProcessedTask) => (
                                    <tr key={task.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-normal text-left text-sm font-medium text-[#172B4D]">
                                            <span className="font-semibold text-[#0052CC]">{task.id}</span>
                                            <span className="block text-xs text-[#42526E]">{task.description}</span>
                                        </td>
                                        {dayHeaders.map((day: string) => (
                                            <td key={`${task.id}-${day}`} className="px-6 py-4 whitespace-nowrap text-right text-sm text-[#42526E]">
                                                {task.logs[day] || '—'}
                                            </td>
                                        ))}
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold bg-soft-gray/50 text-[#172B4D]">
                                            {minutesToTime(task.totalMinutes)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                            {/* Table Footer (Grand Totals) */}
                            <tfoot className="sticky bottom-0 bg-gray-50 border-t-2 border-[#0052CC]">
                                <tr>
                                    <th scope="row" className="px-6 py-4 text-left text-sm font-extrabold text-[#172B4D]">
                                        GRAND TOTAL:
                                    </th>
                                    {dayHeaders.map((day: string) => (
                                        <th key={`total-${day}`} scope="col" className="px-6 py-4 text-right text-sm font-bold text-[#172B4D] whitespace-nowrap">
                                            {minutesToTime(dailyTotals[day] as unknown as number)}
                                        </th>
                                    ))}
                                    <th scope="col" className="px-6 py-4 text-right text-sm font-extrabold text-[#0052CC] bg-soft-gray/50 whitespace-nowrap">
                                        {minutesToTime(grandTotalMinutes)}
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={exportToCSV}
                        className="flex items-center space-x-2 px-6 py-3 bg-primary-blue text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span>Export to Sheets (CSV)</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeLogTable;
