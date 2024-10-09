import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("business");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  const fetchNews = (category) => {
    setLoading(true);
    fetch(
      `https://newsapi.org/v2/everything?q=${category}&from=2024-10-08&to=2024-10-08&sortBy=popularity&apiKey=74ed104431894162b150d675d93dc13a`
    )
      .then((res) => res.json())
      .then((res) => {
        setNews(res.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const NewsData = () => {
    return news.map((e, index) => (
      <div className="col-lg-4 col-md-6 col-sm-12 my-3" key={index}>
        <div className="card shadow-sm border-0 rounded-4">
          <img
            src={e.urlToImage || "https://via.placeholder.com/300x200"}
            className="card-img-top rounded-top"
            alt={e.title}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-truncate">{e.title}</h5>
            <p className="card-text text-muted text-truncate">
              {e.description ? e.description.slice(0, 100) + "..." : ""}
            </p>
            <div className="mt-auto">
              <Link to={`/article/${e.url}`} className="btn btn-primary btn-sm">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container my-5">
      {/* Updated Header Design */}
      <h2
        className="mb-5 text-center text-light p-4 rounded shadow-sm"
        style={{
          background: "linear-gradient(135deg, #4e73df, #36b9cc)",
          fontWeight: "bold",
        }}
      >
        Latest {category} News
      </h2>

      {/* Updated Button Design */}
      <div className="d-flex justify-content-center mb-5 flex-wrap">
        <button
          className={`btn btn-${category === "apple" ? "primary" : "outline-primary"} m-1`}
          onClick={() => setCategory("apple")}
        >
          Apple
        </button>
        <button
          className={`btn btn-${category === "tesla" ? "primary" : "outline-primary"} m-1`}
          onClick={() => setCategory("tesla")}
        >
          Tesla
        </button>
        <button
          className={`btn btn-${category === "business" ? "primary" : "outline-primary"} m-1`}
          onClick={() => setCategory("business")}
        >
          Business
        </button>
        <button
          className={`btn btn-${category === "technology" ? "primary" : "outline-primary"} m-1`}
          onClick={() => setCategory("technology")}
        >
          TechCrunch
        </button>
        <button
          className={`btn btn-${category === "general" ? "primary" : "outline-primary"} m-1`}
          onClick={() => setCategory("general")}
        >
          General
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">{NewsData()}</div>
      )}
    </div>
  );
}
