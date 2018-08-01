package org.devgateway.rdi.tanzania.dhis.pojo.deprecated;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Sebastian Dimunzio
 */

public class CoordinatesDeserializer extends JsonDeserializer<List<Double>> {

    @Override
    public List<Double> deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
            throws IOException, JsonProcessingException {

        String value = jsonParser.readValueAs(String.class);

        try {
            return Arrays.asList(value.substring(1, value.length() - 1).split(",")).stream()
                    .map(s -> Double.parseDouble(s)).collect(Collectors.toList());
        }catch (Exception e){
                e.printStackTrace();
        }
        return null;
    }
}
