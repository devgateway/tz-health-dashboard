package org.devgateway.rdi.tanzania.services;

import org.devgateway.rdi.tanzania.repositories.OPDDiagnosticRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.PropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest()
@PropertySource("dhis.properties")
public class OPDDiagnosesServiceTest {

    @Autowired
    OPDDiagnosticRepository opdDiagnosticRepository;

    @Test
    public void exampleTest() throws Exception {
        opdDiagnosticRepository.findAll();
        Assert.assertTrue(true);
    }
}