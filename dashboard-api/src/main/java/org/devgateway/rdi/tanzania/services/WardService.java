package org.devgateway.rdi.tanzania.services;

import com.vividsolutions.jts.geom.Point;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.repositories.WardRepository;
import org.devgateway.rdi.tanzania.response.BoundaryResponse;
import org.devgateway.rdi.tanzania.response.WardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Sebastian Dimunzio
 */

@Service
public class WardService {
    @Autowired
    WardRepository wardRepository;

    public Ward getWardById(final Long id) {
        Ward ward = null;
        if (id != null) {
            ward = wardRepository.findOne(id);
        }
        return ward;
    }

    public Ward wadByPoint(Point point) {
        return wardRepository.findWardByPoint(point);
    }


    public List<WardResponse> findByKeyword(String keyword) {

        List<Ward> wards = wardRepository.findByName(keyword + "%");

        return wards.stream().map(ward -> {
            WardResponse w = new WardResponse();
            w.setId(ward.getGid());
            w.setName(ward.getName());
            if (ward.getDistrict() != null) {
                w.setDistrict(new BoundaryResponse(ward.getDistrict().getGid(), ward.getDistrict().getName()));
                if (ward.getDistrict().getRegion() != null) {
                    w.setRegion(new BoundaryResponse(ward.getDistrict().getRegion().getGid(), ward.getDistrict().getRegion().getName()));
                }
            }
            return w;
        }).collect(Collectors.toList());

    }

}
