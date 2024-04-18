const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

// Schema for blog posts
const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    set: function (value) {
      this.slug = slugify(value, { lower: true, trim: true });
      return value;
    },
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // Associate blog post with a single user
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // Associate blog post with one or more categories
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "BlogPostCategory",
    },
  ],
});

// Virtual field that returns first 50 words of content
blogPostSchema.virtual("first50").get(function () {
  return this.content.split(/\s+/).slice(0, 50).join(" ");
});

// Virtual field that returns the month abbreviation
blogPostSchema.virtual("monthAbbreviation").get(function () {
  // Ensure that 'this.date' is defined and is a valid Date object
  if (
    !this.date ||
    !(this.date instanceof Date) ||
    isNaN(this.date.getTime())
  ) {
    return null;
  }

  // Get the abbreviation of the month from the Date object
  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthAbbreviations[this.date.getMonth()];
});

// Define a virtual field to return the day number
blogPostSchema.virtual("dayNumber").get(function () {
  // Ensure that 'this.date' is defined and is a valid Date object
  if (
    !this.date ||
    !(this.date instanceof Date) ||
    isNaN(this.date.getTime())
  ) {
    return null;
  }

  // Get the day number from the Date object
  return this.date.getDate();
});

// Create a model based on the schema
module.exports = mongoose.model("BlogPost", blogPostSchema, "blogposts");
