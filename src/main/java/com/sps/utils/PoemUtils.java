package com.sps.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;

public class PoemUtils {
  /**
   * Parse the request body to a Json
   *
   * @param request - The HTTP request object
   * @return - A JSON object containing the body
   * @throws IOException
   */
  public JsonObject convertRequestToJson(HttpServletRequest request) throws IOException {
    String requestData = "";
    StringBuilder builder = new StringBuilder();
    BufferedReader reader = request.getReader();
    String line;
    while ((line = reader.readLine()) != null) {
      builder.append(line);
    }
    requestData = builder.toString();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    JsonObject jsonObject = gson.fromJson(requestData, JsonObject.class);
    return jsonObject;
  }
}
