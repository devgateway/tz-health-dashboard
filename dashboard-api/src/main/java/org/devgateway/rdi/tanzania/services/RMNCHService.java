package org.devgateway.rdi.tanzania.services;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.repositories.FacilityRepository;
import org.devgateway.rdi.tanzania.repositories.RMNCHRepository;
import org.devgateway.rdi.tanzania.response.RMNCHResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author Sebastian Dimunzio
 */

@Service
public class RMNCHService {

    @Autowired
    RMNCHRepository rmnchRepository;

    @Autowired
    FacilityRepository facilityRepository;

    public List<RMNCHResponse> getRMNCHbyPeriod(Long id, Integer year, Integer quarter, Integer month) {
        Facility f = facilityRepository.getOne(id);

        List<RMNCHResponse> rmnchResponses = rmnchRepository.getRMNCH(f, year, quarter, month);

        final Integer[] prevPeriod = getPrevPeriod(year, quarter, month);

        List<RMNCHResponse> data = rmnchResponses.stream().map(new Function<RMNCHResponse, RMNCHResponse>() {
            @Override
            public RMNCHResponse apply(RMNCHResponse rmnchResponse) {

                RMNCHResponse totalPrevPeriod = rmnchRepository.
                        getRMNCH(f, prevPeriod[0], prevPeriod[1], prevPeriod[2], rmnchResponse.getIndicator()).get(0);


                rmnchResponse.setTotalPrevPeriod(totalPrevPeriod.getValue());
                return rmnchResponse;
            }
        }).collect(Collectors.toList());

        return data;
    }


    private Integer[] getPrevPeriod(Integer year, Integer quarter, Integer month) {
        Integer prevYear = year;
        Integer prevQuarter = null;
        Integer prevMonth = null;

        if (month != null) {
            if (month == 1) {
                prevMonth = 12;
                prevYear = year - 1;
            } else {
                prevMonth = month - 1;
            }

        } else if (quarter != null) {

            if (quarter == 1) {
                prevQuarter = 4;
                prevYear = year - 1;
            } else {
                prevQuarter = quarter - 1;
            }

        } else {
            prevYear = year - 1;

        }

        return new Integer[]{prevYear, prevQuarter, prevMonth};

    }
}
