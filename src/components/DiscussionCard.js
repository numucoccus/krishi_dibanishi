import React from "react";

export default function DiscussionCard({ category, title, subtitle, author, role, comments, likes, views, time }) {
  return (
    <div className="border rounded p-3 shadow-sm bg-white">
      <p className="text-muted small mb-1">{category}</p>
      <h6 className="mb-1 fw-bold">{title}</h6> {/* <- Smaller heading */}
      <p className="text-muted small mb-2 fst-italic">{subtitle}</p>
      <div className="d-flex justify-content-between text-muted small">
        <span>{author} ({role})</span>
        <span>{time}</span>
      </div>
      <div className="mt-2 d-flex gap-3 small text-muted">
        <span>{comments}</span>
        <span>{likes}</span>
        <span>{views}</span>
      </div>
    </div>
  );
}

