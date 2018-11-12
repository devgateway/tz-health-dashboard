package org.devgateway.rdi.tanzania.services;

import org.devgateway.geo.GeoJsonBuilder;
import org.devgateway.rdi.tanzania.domain.District;
import org.devgateway.rdi.tanzania.domain.Region;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.geojson.BoundaryTransformer;
import org.devgateway.rdi.tanzania.repositories.BoundarySpecifications;
import org.devgateway.rdi.tanzania.repositories.DistrictRepository;
import org.devgateway.rdi.tanzania.repositories.RegionRepository;
import org.devgateway.rdi.tanzania.repositories.WardRepository;
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
@Cacheable
public class GeoJsonService {


    @Autowired
    private RegionRepository regionRepository;


    @Autowired
    private DistrictRepository districtRepository;


    @Autowired
    private WardRepository wardRepository;


    @Cacheable("regions")
    public FeatureCollection findRegions(final BoundaryRequest boundaryRequest) {

        List<Region> regions = regionRepository.
                findAll(BoundarySpecifications.getRegionSpecifications(boundaryRequest),
                        boundaryRequest.getSimplifyFactor());

        GeoJsonBuilder geoJsonBuilder = new GeoJsonBuilder();
        regions.stream().forEach(region -> geoJsonBuilder.add(BoundaryTrasnfomer.transform(region,true)));
        return geoJsonBuilder.getFeatures();
    }

    @Cacheable("regions")
    public FeatureCollection getRegionById(final Long id) {
        Region region = regionRepository.findOne(id);
        GeoJsonBuilder geoJsonBuilder = new GeoJsonBuilder();
        geoJsonBuilder.add(BoundaryTransformer.transform(region,true));
        return geoJsonBuilder.getFeatures();
    }


    @Cacheable("districts")
    public FeatureCollection getDistricts(final BoundaryRequest boundaryRequest) {
        List<District> districts = districtRepository.findAll(BoundarySpecifications.getDistricSpecifications(boundaryRequest),
                boundaryRequest.getSimplifyFactor());

        GeoJsonBuilder geoJsonBuilder = new GeoJsonBuilder();
        districts.stream().forEach(region -> geoJsonBuilder.add(BoundaryTransformer.transform(region,true)));
        return geoJsonBuilder.getFeatures();
    }


    @Cacheable("districts")
    public FeatureCollection getDistrictById(final Long id) {
        District district = districtRepository.findOne(id);
        GeoJsonBuilder geoJsonBuilder = new GeoJsonBuilder();
        geoJsonBuilder.add(BoundaryTransformer.transform(district,true));
        return geoJsonBuilder.getFeatures();
    }


    @Cacheable("wards")
    public FeatureCollection findWards(final BoundaryRequest boundaryRequest) {
        List<Ward> wards = wardRepository.findAll(BoundarySpecifications.getWardSpecifications(boundaryRequest),
                boundaryRequest.getSimplifyFactor());

        GeoJsonBuilder geoJsonBuilder = new GeoJsonBuilder();
        wards.stream().forEach(region -> geoJsonBuilder.add(BoundaryTransformer.transform(region,true)));
        return geoJsonBuilder.getFeatures();
    }


    @Cacheable("wards")
    public FeatureCollection getWardById(final Long id) {
        Ward ward = wardRepository.findOne(id);
        GeoJsonBuilder geoJsonBuilder = new GeoJsonBuilder();
        geoJsonBuilder.add(BoundaryTransformer.transform(ward, true));
        return geoJsonBuilder.getFeatures();
    }

}
