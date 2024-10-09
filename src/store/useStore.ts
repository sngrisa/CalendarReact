import { create } from 'zustand';
import { IEventCalendar } from '../pages/calendar/calendar';

export interface IUserEvent {
    _id: string;
    name: string;
}

interface StoreState {
    isModalOpen: boolean;
    isModalOpenDetails: boolean;
    events: IEventCalendar[];
    selectedEvent: IEventCalendar | null;
    openModal: () => void;
    closeModal: () => void;
    addEvent: (event: IEventCalendar) => void;
    removeEvent: (id: string) => void;
    updateEvent: (updatedEvent: IEventCalendar) => void;
    getEvent: (id: string) => IEventCalendar | undefined;
    openModalDetails: () => void;
    closeModalDetails: () => void;
    setSelectedEvent: (event: any) => void;
}

const useStore = create<StoreState>((set, get) => ({
    isModalOpen: false,
    isModalOpenDetails: false,
    events: [],
    selectedEvent: null,
    openModal: () => set({ isModalOpen: true }),
    openModalDetails: () => set({isModalOpenDetails: true}),
    closeModal: () => set({ isModalOpen: false }),
    closeModalDetails: () => set({isModalOpenDetails: false}),
    addEvent: (event: IEventCalendar) => set((state) => ({ events: [...state.events, event] })),
    removeEvent: (id: string) => set((state) => ({
        events: state.events.filter(event => event.user._id !== id)
    })),
    updateEvent: (updatedEvent: IEventCalendar) => set((state) => ({
        events: state.events.map((event: any) =>
            event.id === updatedEvent.id ? updatedEvent : event
        )
    })),
    getEvent: (id: string) => {
        const state = get();
        return state.events.find(event => event.user._id === id);
    },
    setSelectedEvent: (event: any) => set({ selectedEvent: event })
}));

export { useStore };


