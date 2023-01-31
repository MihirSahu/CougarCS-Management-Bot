export type SheetEvent = {
    date: Date;
    time: Date;
    eventTitle: string;
    location: string;
    partners: string[];
    type: "Workshop 🧠" | "Social 🎉" | "Company Mixer 👨‍💼" | "UH Event 🎓";
    talkingPoints: string;
    meetingLink: string;
    rsvpLink: string;
    extraInfo: string;
}

export type SheetMeeting = {
    date: Date;
    time: Date;
    title: string;
    organizations: string[];
    contacts: string[];
    location: string;
    notes: string;
    remarks: string;
}

export type SheetTodo = {
    deadline: Date;
    status: "Not Started ❌" | "In-Progress ⚠️" | "Completed ✅" | "Postponed 👀" | "Canceled 💀";
    name: string;
    asignees: string[];
    description: string[];
}

export type SheetMarketing = {
    date: Date;
    status: "Not Started ❌" | "In-Progress ⚠️" | "Completed ✅";
    description: string;
    platforms: string[];
    remarks: string;
    platformOptions: string[],
    faults: string;
}