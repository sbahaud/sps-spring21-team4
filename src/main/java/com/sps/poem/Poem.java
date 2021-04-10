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

  /**
   * Creates a new poem
   *
   * @param id        - Unique poem id
   * @param title     - The poem title
   * @param poet      - The poet or author of the poem
   * @param text      - The full text of the poem
   * @param poemLines - The individual lines of the poem
   * @param source    - Where the poem was first published
   * @param dateAdded - Timestamp indicating when the poem was added
   */
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
