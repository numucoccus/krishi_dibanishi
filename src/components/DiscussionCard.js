import React from "react";

export default function DiscussionCard({
  category,
  title,
  subtitle,
  author,
  role,
  comments,
  likes,
  views,
  time
}) {
  return (
    <div className="discussion-card">
      <span className="category">{category}</span>
      <h3>{title}</h3>
      <p className="subtitle">{subtitle}</p>
      <p className="author">
        {author} - {role}
      </p>
      <div className="stats">
        <span>{comments} মন্তব্য</span>
        <span>{likes} লাইক</span>
        <span>{views} ভিউ</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
