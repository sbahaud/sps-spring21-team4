package com.sps.annotation;

/**
 * Class that stores information about an annotation
 */
public class Annotation {
  private final long annotationId;
  private final String lineId;
  private final String annotationText;
  private final long dateAdded;

  public Annotation(final long annotationId, final String lineId, final String annotationText,
      final long dateAdded) {
    this.annotationId = annotationId;
    this.lineId = lineId;
    this.annotationText = annotationText;
    this.dateAdded = dateAdded;
  }
}