package com.sps.poem;

/**
 * Class that stores information about a poem
 */
public class Poem {
  private long id;
  private String poemTitle;
  private String poetName;
  private String fullText;
  private String source;
  private long dateAdded;
  private String poemLines;

  public Poem(final long id, final String title, final String poet, final String text,
      final String poemLines, final String source, final long dateAdded) {
    this.id = id;
    this.poemTitle = title;
    this.poetName = poet;
    this.fullText = text;
    this.poemLines = poemLines;
    this.source = source;
    this.dateAdded = dateAdded;
  }
}
