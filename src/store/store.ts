import { create } from "zustand";
import { nanoid } from "nanoid";
import { NewsItem } from "../types";
import { produce } from "immer";

type State = {
  news: NewsItem[];
  isInit: boolean;
};

type Actions = {
  getNews: (id?: string) => NewsItem | undefined;
  addNews: (item: { title: string; content: string }) => void;
  setNews: (news: NewsItem[]) => void;
  updateNews: (id: string, content: { title: string; content: string }) => void;
  removeNews: (id?: string) => void;
  getIsInit: () => boolean;
  setIsInit: (value: boolean) => void;
};

export const useNewsStore = create<State & Actions>((set, get) => ({
  news: [],
  isInit: false,
  getIsInit: () => get().isInit,
  setIsInit: (value) => set({ isInit: value }),
  getNews: (id) => {
    return get().news.find((el) => el.id === id);
  },
  setNews: (news) => {
    set(() => ({ news }));
  },
  addNews: (item) => {
    const currentDate = new Date().toLocaleString();
    set((state) => ({
      news: [
        {
          ...item,
          id: nanoid(10),
          createDate: currentDate,
          updateDate: currentDate,
        },
        ...state.news,
      ],
    }));
    localStorage.setItem("news", JSON.stringify(get().news));
  },
  updateNews: (id, content) => {
    const currentDate = new Date().toLocaleString();
    set(
      produce((state: State) => {
        const index = state.news.findIndex((el) => el.id === id);
        if (index < 0) return state;

        state.news[index] = {
          ...state.news[index],
          ...content,
          updateDate: currentDate,
        };
      })
    );
    localStorage.setItem("news", JSON.stringify(get().news));
  },
  removeNews: (id) => {
    set((state) => ({ news: state.news.filter((item) => item.id !== id) }));
    localStorage.setItem("news", JSON.stringify(get().news));
  },
}));
