function updateVideoJob() {
  const id = "Tt7bzxurJ1I";
  const videoDetails = getVideoDetails(id);

  if (needsUpdate(videoDetails)) {
    updateTitle(videoDetails);
  }
}

function getVideoDetails(videoId) {
  const { items } = YouTube.Videos.list("snippet,statistics", { id: videoId });
  const {
    snippet: { title, categoryId },
    statistics: { viewCount },
  } = items[0];
  return {
    id: videoId,
    title,
    categoryId,
    viewCount,
  };
}

function needsUpdate({ title, viewCount }) {
  const views = title.replace(/[^0-9]/g, "");
  return viewCount !== views;
}

function updateTitle(videoDetails) {
  const { viewCount, categoryId, id } = videoDetails;
  const videoInfo = {
    snippet: {
      title: `Este video tiene ${viewCount.replace(
        /(\d)(?=(\d{3})+(?!\d))/g,
        "$1,"
      )} visitas!`,
      categoryId,
    },
    id,
  };

  YouTube.Videos.update(videoInfo, "snippet,id");
  Logger.log("Video actualizado.");
  Logger.log("Título anterior: ", videoDetails.title);
  Logger.log("Título nuevo: ", videoInfo.snippet.title);
}
