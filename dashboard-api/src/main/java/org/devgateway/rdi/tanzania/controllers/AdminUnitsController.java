package org.devgateway.rdi.tanzania.controllers;

import org.devgateway.rdi.tanzania.domain.District;
import org.devgateway.rdi.tanzania.domain.Region;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.repositories.DistrictRepository;
import org.devgateway.rdi.tanzania.repositories.RegionRepository;
import org.devgateway.rdi.tanzania.repositories.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */
@RestController
@CrossOrigin("http://localhost:3000")
public class AdminUnitsController {


    @Autowired
    RegionRepository regionRepository;

    @Autowired
    DistrictRepository districtRepository;


    @Autowired
    WardRepository wardRepository;

    @RequestMapping("/regions")
    public ResponseEntity<List<Region>> getRegions() {
        List<Region> regions = regionRepository.findAll();
        if (regions != null) {
            return new ResponseEntity<List<Region>>(regions, HttpStatus.OK);

        } else return new ResponseEntity<List<Region>>(HttpStatus.NOT_FOUND);

    }


    @RequestMapping("/districts")
    public ResponseEntity<List<District>> getDistricts(@RequestParam(name = "region", required = false) Long id) {
        List<District> data = null;
        if (id != null) {
            Region region = regionRepository.findOne(id);
            if (region != null) {
                data = districtRepository.findByRegion(region);
            }
        } else {
            data = districtRepository.findAll();
        }

        if (data != null) {
            return new ResponseEntity<List<District>>(data, HttpStatus.OK);

        } else {
            return new ResponseEntity<List<District>>(HttpStatus.NOT_FOUND);
        }
    }


    @RequestMapping("/wards")
    public ResponseEntity<List<Ward>> getWard(@RequestParam(name = "district", required = false) Long id) {

        List<Ward> data = null;

        if (id != null) {
            District district = districtRepository.findOne(id);
            if (district != null) {
                data = wardRepository.findByDistrict(district);
            }
        } else {
            data = wardRepository.findAll();
        }


        if (data != null) {
            return new ResponseEntity<List<Ward>>(data, HttpStatus.OK);

        } else {
            return new ResponseEntity<List<Ward>>(HttpStatus.NOT_FOUND);
        }
    }


}
