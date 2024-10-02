import { useNewsStore } from "../store/store";
import { trimText } from "../utils/trimText";
import { NewsItem } from "./news-item";

export const News = () => {
  const news = useNewsStore((state) => state.news);
  return (
    <div className="flex flex-col gap-4 flex-1 ">
      {news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.map((el) => {
            return (
              <NewsItem
                key={el.id}
                id={el.id}
                title={el.title}
                date={el.createDate}
              >
                {trimText(el.content)}
              </NewsItem>
            );
          })}
        </div>
      ) : (
        <div className="text-lg flex-1 flex items-center justify-center">
          Нет новостей
        </div>
      )}
    </div>
  );
};
