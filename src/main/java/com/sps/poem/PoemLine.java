package com.sps.poem;

public class PoemLine {
  final long lineId;
  final String lineText;

  /**
   * Creates a new poem line.
   *
   * @param id            - The unique id of the line.
   * @param text          - The text of the line.
   */
  public PoemLine(long id, String text) {
    this.lineId = id;
    this.lineText = text;
  }
}