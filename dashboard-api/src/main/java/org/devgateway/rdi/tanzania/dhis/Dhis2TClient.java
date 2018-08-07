package org.devgateway.rdi.tanzania.dhis;

import org.hisp.dhis.Dhis2Config;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.GsonHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class Dhis2TClient {


    private RestTemplate restTemplate;
    private Dhis2Config dhis2Config;

    public Dhis2TClient(Dhis2Config dhis2Config) {
        this.dhis2Config = dhis2Config;
        this.restTemplate = new RestTemplate();

        List<HttpMessageConverter<?>> messageConverters = new ArrayList<>();
        messageConverters.add(new GsonHttpMessageConverter());
        restTemplate.setMessageConverters(messageConverters);

    }

    private <T> T getObjectFromUrl(String url, Class<T> klass) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", getBasicAuthString(this.dhis2Config.getUsername(), this.dhis2Config.getPassword()));
        headers.set("Accept", "application/json");
        ResponseEntity<T> response = this.restTemplate.exchange(url, HttpMethod.GET, new HttpEntity(headers), klass, new Object[0]);
        return response.getBody();
    }

    private static String getBasicAuthString(String username, String password) {
        String string = username + ":" + password;
        return "Basic " + Base64.getEncoder().encodeToString(string.getBytes());
    }

    public <T> T getObject(String path, Class<T> klass) {
        return this.getObjectFromUrl(this.dhis2Config.getResolvedUrl(path), klass);
    }

    private <T> T getObject(String path, String id, Class<T> klass) {
        String url = this.dhis2Config.getResolvedUriBuilder().pathSegment(new String[]{path}).pathSegment(new String[]{id}).build().toUriString();
        return this.getObjectFromUrl(url, klass);
    }

}
