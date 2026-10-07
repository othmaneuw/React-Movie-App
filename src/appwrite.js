import { Client, ID, TablesDB, Query } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const tablesDB = new TablesDB(client);

export const addMovie = async (movie_id, title, movie_image) => {
  try {
    await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ID.unique(),
      data: { movie_id, title, movie_image },
    });
    console.log("Row Added!");
  } catch (error) {
    console.log(`Error storing data : ${error.message}`);
  }
};

export const findMovie = async (title) => {
  try {
    console.log(title);
    const response = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.equal("title", [title])],
    });
    console.log("Response", response);
    if (response.rows.length > 0) return response.rows[0];
    return null;
  } catch (error) {
    console.log(`Error Searching Movie : ${error}`);
  }
};

export const updateCount = async (movie) => {
  console.log(movie.count);
  try {
    await tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: movie.$id,
      data: { count: movie.count + 1 },
    });
    console.log("count updated");
  } catch (error) {
    console.log("Error Updating the Count : " + error.message);
  }
};

export const fetchTrendingMovies = async () => {
  //FETCHING 5 TREND MOVIES GOES HERE
  const trendingMovies = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    queries: [Query.limit(5), Query.orderDesc("count")],
  });
  return trendingMovies;
};
