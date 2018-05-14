package org.devgateway.rdi.tanzania.controllers;

/**
 * @author Sebastian Dimunzio
 */

import org.devgateway.rdi.tanzania.request.BoundaryRequest;
import org.devgateway.rdi.tanzania.services.BoundaryService;
import org.geojson.FeatureCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("http://localhost:3000")
public class BoundaryController {

    @Autowired
    private BoundaryService boundaryService;


    @RequestMapping("/region/find")
    public FeatureCollection getRegions(BoundaryRequest boundaryRequest){
        return boundaryService.getRegions(boundaryRequest);
    }

    @RequestMapping("/district/find")
    public FeatureCollection getDistrics(BoundaryRequest boundaryRequest){
        return boundaryService.getDistricts(boundaryRequest);
    }

    @RequestMapping("/ward/find")
    public FeatureCollection getWards(BoundaryRequest boundaryRequest){
        return boundaryService.getWards(boundaryRequest);
    }
}
