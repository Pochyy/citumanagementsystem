export const initialConversations = [
  {
    id: 1,
    name: "Juan Reyes",
    course: "BS Computer Science",
    school: "UP Diliman",
    avatar: {
      bg: "#3b82f6",
      color: "#fff",
    },
    messages: [
      {
        id: 1,
        from: "them",
        text: "Good afternoon! I wanted to ask if I can submit my TOR separately since it's still being processed by the registrar.",
      },
      {
        id: 2,
        from: "me",
        text: "Hi Juan! Yes, that's fine. Please submit your other documents for now and send the TOR as soon as it's available.",
      },
    ],
  },
  {
    id: 2,
    name: "Maria Santos",
    course: "BS Information Systems",
    school: "DLSU Manila",
    avatar: {
      bg: "#15803d",
      color: "#fff",
    },
    messages: [
      {
        id: 1,
        from: "them",
        text: "Hi! Just following up on my application for the UI/UX Design internship.",
      },
      {
        id: 2,
        from: "me",
        text: "Hi Maria! We're reviewing applications this week.",
      },
    ],
  },
];