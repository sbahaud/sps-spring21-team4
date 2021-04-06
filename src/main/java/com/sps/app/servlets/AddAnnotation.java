package com.sps.app.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Date;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for adding annotations. */
@WebServlet("/new-annotation")
public class AddAnnotation extends HttpServlet {
  @Override
  public void doPost(final HttpServletRequest request, final HttpServletResponse response)
      throws IOException {
    String requestData = "";
    StringBuilder builder = new StringBuilder();
    BufferedReader reader = request.getReader();
    String line;
    while ((line = reader.readLine()) != null) {
      builder.append(line);
    }
    requestData = builder.toString();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    JsonObject json = gson.fromJson(requestData, JsonObject.class);

    final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    KeyFactory keyFactory = datastore.newKeyFactory().setKind("Annotation");
    FullEntity annotationEntity =
        Entity.newBuilder(keyFactory.newKey())
            .set("poemId", json.get("poemId").getAsLong())
            .set("lineId", json.get("lineId").getAsString())
            .set("annotationText", json.get("annotationText").getAsString())
            .set("dateAdded", new Date().getTime())
            .build();

    datastore.put(annotationEntity);
    response.setContentType("application/json");
    response.getWriter().println(gson.toJson("{status: \"ok\", code: 200}"));
  }
}
