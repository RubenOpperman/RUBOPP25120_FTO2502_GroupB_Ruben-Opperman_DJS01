export const DataManager = {
  getGenreIds(ids, allGenres) {
    return ids.map((id) => {
      const genre = allGenres.find((g) => g.id === id);
      return genre ? genre.title : "unknown";
    });
  },

  timeAgo(dateString) {
    const now = new Date();
    const updated = new Date(dateString);
    const secondsAgo = Math.floor((now - updated) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(secondsAgo / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  },
};
