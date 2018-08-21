package org.devgateway.rdi.tanzania.controllers;

import org.devgateway.rdi.tanzania.domain.ServiceAreaPopulation;
import org.devgateway.rdi.tanzania.services.PopulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@RestController
@CrossOrigin("http://localhost:3000")
public class PopulationController {

    @Autowired
    PopulationService populationService;

    @RequestMapping("/facility/{id}/service")
    public List<ServiceAreaPopulation> serviceAreaPopulations(@PathVariable Long id, @RequestParam(name = "y") Integer year) {
        return populationService.getServiceAreaPopulation(id, year);
    }

}
