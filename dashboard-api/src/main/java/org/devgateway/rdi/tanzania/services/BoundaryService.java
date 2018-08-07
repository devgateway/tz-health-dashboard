package org.devgateway.rdi.tanzania.services;

import org.devgateway.geo.GeoJsonBuilder;
import org.devgateway.rdi.tanzania.domain.District;
import org.devgateway.rdi.tanzania.domain.Region;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.geojson.BoundaryTrasnfomer;
import org.devgateway.rdi.tanzania.repositories.BoundarySpecifications;
import org.devgateway.rdi.tanzania.repositories.DistrictRepository;
import org.devgateway.rdi.tanzania.repositories.RegionRepository;
import org.devgateway.rdi.tanzania.repositories.WardRepositoryImpl;
import org.devgateway.rdi.tanzania.request.BoundaryRequest;
import org.geojson.FeatureCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Service
public class BoundaryService {


    @Autowired
    RegionRepository regionRepository;


    @Autowired
    DistrictRepository districtRepository;


    @Autowired
    WardRepositoryImpl wardRepository;


    @Cacheable("regions")
    public FeatureCollection getRegions(BoundaryRequest boundaryRequest) {
        List<Region> regions = regionRepository.findAll();
        GeoJsonBuilder geoJsonBuilder = new GeoJsonBuilder();
        regions.stream().forEach(region -> geoJsonBuilder.add(BoundaryTrasnfomer.transform(region)));
        return geoJsonBuilder.getFeatures();
    }


    @Cacheable("districts")
    public FeatureCollection getDistricts(BoundaryRequest boundaryRequest) {

        List<District> districts = districtRepository.findAll(BoundarySpecifications.getDistricSpecifications(boundaryRequest),
                boundaryRequest.getSimplifyFactor());

        GeoJsonBuilder geoJsonBuilder = new GeoJsonBuilder();
        districts.stream().forEach(region -> geoJsonBuilder.add(BoundaryTrasnfomer.transform(region)));
        return geoJsonBuilder.getFeatures();
    }


    @Cacheable("wards")
    public FeatureCollection getWards(BoundaryRequest boundaryRequest) {


        List<Ward> wards = wardRepository.findAll(BoundarySpecifications.getWardSpecifications(boundaryRequest),
                boundaryRequest.getSimplifyFactor());


        GeoJsonBuilder geoJsonBuilder = new GeoJsonBuilder();


        wards.stream().forEach(ward -> geoJsonBuilder.add(BoundaryTrasnfomer.transform(ward)));
        return geoJsonBuilder.getFeatures();
    }


}
