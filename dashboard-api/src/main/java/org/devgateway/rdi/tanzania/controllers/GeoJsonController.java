package org.devgateway.rdi.tanzania.controllers;

/**
 * @author Sebastian Dimunzio
 */

import org.devgateway.rdi.tanzania.request.BoundaryRequest;
import org.devgateway.rdi.tanzania.services.GeoJsonService;
import org.devgateway.rdi.tanzania.services.WardService;
import org.geojson.FeatureCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(path = "/geo")
public class GeoJsonController {

    @Autowired
    private GeoJsonService boundaryService;

    @Autowired
    private WardService wardService;


    @RequestMapping("regions")
    public FeatureCollection getRegions(BoundaryRequest boundaryRequest) {
        return boundaryService.findRegions(boundaryRequest);
    }


    @RequestMapping("/districts")
    public FeatureCollection getDistrics(BoundaryRequest boundaryRequest) {
        return boundaryService.getDistricts(boundaryRequest);
    }

    @RequestMapping("/wards")
    public FeatureCollection getWards(BoundaryRequest boundaryRequest) {
        return boundaryService.findWards(boundaryRequest);
    }


    @RequestMapping("/regions/{id}")
    public FeatureCollection getRegion(@PathVariable Long id) {
        return boundaryService.getRegionById(id);
    }

    @RequestMapping("/districts/{id}")
    public FeatureCollection getDistrict(@PathVariable Long id) {
        return boundaryService.getDistrictById(id);
    }

    @RequestMapping("/wards/{id}")
    public FeatureCollection getWardById(@PathVariable Long id) {
        return boundaryService.getWardById(id);
    }


}
