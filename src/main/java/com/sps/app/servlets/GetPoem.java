package com.sps.app.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.IncompleteKey;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.gson.Gson;
import com.sps.poem.Poem;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

/** Servlet responsible for fetching poems. */
@WebServlet("/poem")
public class GetPoem extends HttpServlet {
  @Override
  public void doGet(final HttpServletRequest request, final HttpServletResponse response)
      throws IOException {
    final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    final Query<Entity> query;
    String idParam = request.getParameter("id");
    if (idParam == null || idParam.isEmpty()) {
      query = Query.newEntityQueryBuilder()
                  .setKind("Poem")
                  .setOrderBy(OrderBy.desc("dateAdded"))
                  .build();
    } else {
      idParam = Jsoup.clean(request.getParameter("id"), Whitelist.none());
      long poemId = Long.parseLong(idParam);
      IncompleteKey poemKey = datastore.newKeyFactory().setKind("Poem").newKey();
      Key key = Key.newBuilder(poemKey.getProjectId(), poemKey.getKind(), poemId).build();
      query = Query.newEntityQueryBuilder()
                  .setKind("Poem")
                  .setFilter(PropertyFilter.eq("__key__", key))
                  .build();
    }
    final QueryResults<Entity> results = datastore.run(query);
    final List<Poem> poems = new ArrayList<>();
    while (results.hasNext()) {
      final Entity entity = results.next();

      final long id = entity.getKey().getId();
      final String title = entity.getString("poemTitle");
      final String poet = entity.getString("poetName");
      final String text = entity.getString("fullText");
      final String source = entity.getString("source");
      final String lines = entity.getString("poemLines");
      final long dateAdded = entity.getLong("dateAdded");

      final Poem poem = new Poem(id, title, poet, text, lines, source, dateAdded);
      poems.add(poem);
    }

    final Gson gson = new Gson();

    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(poems));
  }
}
