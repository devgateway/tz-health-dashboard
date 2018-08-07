package org.devgateway.rdi.tanzania.dhis.pojo.deprecated;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.vividsolutions.jts.geom.Geometry;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;

/**
 * @author Sebastian Dimunzio
 */

public class GeometryDeserializer extends JsonDeserializer<Geometry> {

    @Override
    public Geometry deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
            throws IOException, JsonProcessingException {
        String value = jsonParser.readValueAs(String.class);

        ((LinkedHashMap)jsonParser.readValueAs(HashMap.class).get("geometry")).get("coordinates");
        System.out.print(value);
        return null;
    }
}
