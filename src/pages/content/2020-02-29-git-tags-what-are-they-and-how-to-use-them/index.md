---
path: "/blog/git-tags-what-are-they-and-how-to-use-them"
date: "2020-02-29"
title: "Git Tags: What are they and How to use them"
published: true
description: how to use git tags
---

Git Tags are references to a specific point in a repository's history, they are pointers to commits and are mostly used to mark release points i.e v0.0.1. Tags are different from branches because unlike branches after they are created commits can't be added to them.

## Creating a Tag

There are two types of tags supported by git (Lightweight Tags and Annotated Tags)

**Annotated Tags:** are tags that store information relating to the tag such as the description, tagger, and date. to create an annotated tag we use the -a flag. The -m flag is also used to provide a custom message, if it isn't provided git launches your editor.

```shell
git tag -a v0.0.1 -m "An annotated Tag"
```

To  see the information of an annotated tag run:

```shell
git cat-file tag v0.0.1
```

![enter image description here](https://res.cloudinary.com/dis3a42lz/image/upload/v1582996216/blog/git%20tags/tag2.png)

**Lightweight Tags:** are just pointers to a specific commit history and they don't provide any extra information relating to the tag.

```shell
git tag v0.0.2
```

## Creating a Tag from a commit

By default, tags are created from the most recent commit. If you want to tag an older commit then run

```shell
git tag v0.0.3 <commit-id>
```

## Listing Tags

To list the tags in your repository run ``git tag`` this list tags in alphabetical order

## Searching For Tags

In a case where the tags are much and you are looking for a specific tag, you can add the -l flag to search for the specific tag needed

```shell
git tag -l v0.0.2
```

## Pushing Tags to a Repository

A tag isn't pushed to a repository when you run `git push`. To push a tag to a repository you have to run

```shell
git push origin <tag-name>
```

## Checkout a Tag

You can checkout a tag by running `git checkout <tag-name>` however this only allows you to view the  state of the repository as of when the tag was created, to be able to make changes you have to create a branch from the existing tag by running

```shell
git checkout -b <new-branch> <tag-name>
```

## Delete a Tag

To delete a tag on your local repository you can simply run

```shell
git tag -d v0.0.1
```

however, if the tag exists on your remote server you will have to run this command

```shell
git push origin --delete v0.0.1
```

In conclusion you should use a tag to create a new release rather than branches and you can always branch off a tag to create patches to a release version.
