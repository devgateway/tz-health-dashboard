package org.devgateway.rdi.tanzania;

import org.hisp.dhis.Dhis2Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * @author Sebastian Dimunzio
 */


@Component
@Configuration
@PropertySource("dhis.properties")
public class Dhis {

    @Value("${dhis.instance.url}")
    private String url;

    @Value("${dhis.instance.username}")
    private String userName;

    @Value("${dhis.instance.password}")
    private String password;


    @Bean
    public Dhis2Config dhis2() {
        Dhis2Config config = new Dhis2Config(
                url,
                userName,
                password);

        return config;
    }
}
