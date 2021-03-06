"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var sass = require("gulp-sass");

sass.compiler = require("node-sass");

// =========================================
// YARN DEV
// =========================================
gulp.task("dev", function () {
  gulp.watch("./src/style/**/*.scss", gulp.series("sass"));
  gulp.watch("./src/script/**/*.js", gulp.series("js"));
  gulp.watch("./static/**/*", gulp.series("copy-static"));
});

// =========================================
// YARN BUILD
// =========================================
gulp.task("build", async function () {
  return gulp.parallel("js", "sass", "copy-static")();
});

// =========================================
// TASKS
// =========================================

gulp.task("sass", function () {
  return gulp
    .src("./src/style/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("main.css"))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("sass:watch", function () {
  gulp.watch("./src/style/*.scss", gulp.series("sass"));
});

gulp.task("js", function () {
  return gulp.src("./src/script/*.js").pipe(gulp.dest("./dist/"));
});

gulp.task("js:watch", function () {
  gulp.watch("./src/script/*.js", gulp.series("js"));
});

gulp.task("copy-static", function () {
  return gulp.src(["./static/**/*"]).pipe(gulp.dest("./dist/"));
});
