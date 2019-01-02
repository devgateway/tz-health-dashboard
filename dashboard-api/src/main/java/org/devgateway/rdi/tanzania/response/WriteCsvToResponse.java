package org.devgateway.rdi.tanzania.response;

import com.opencsv.CSVWriter;
import org.devgateway.rdi.tanzania.Constants;
import org.devgateway.rdi.tanzania.domain.Translation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.PrintWriter;
import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;
import java.util.stream.Collectors;

/**
 * @author Sebastian Dimunzio
 */

public class WriteCsvToResponse {

    private static final Logger LOGGER = LoggerFactory.getLogger(WriteCsvToResponse.class);


    public static void writeFacilitiesResponse(PrintWriter print, List<FacilityResponse> facilityResponses, String locale) {

        Locale aLocale = new Locale(locale);

        ResourceBundle messages = ResourceBundle.getBundle("MessagesBundle", aLocale);

        CSVWriter writer = new CSVWriter(print);

        String[] header = new String[]{
                messages.getString("Code"),
                messages.getString("Name"),
                messages.getString("Latitude"),
                messages.getString("Longitude"),
                messages.getString("Ownership"),
                messages.getString("Detailed_Ownership"),
                messages.getString("Facility_Type"),
                messages.getString("Ward"),
                messages.getString("District"),
                messages.getString("Region")};

        writer.writeNext(header);

        List<String[]> allData = facilityResponses.stream().map(facilityResponse -> {
            String code = facilityResponse.getCode();
            String name = facilityResponse.getName();
            String latitude = Double.toString(facilityResponse.getPoint().getY());
            String longitude = Double.toString(facilityResponse.getPoint().getX());

            String ownership = facilityResponse.getOwnership() != null ? facilityResponse.getOwnership().getName() : null;
            String detailedOwnership = facilityResponse.getDetailedOwnership() != null ? facilityResponse.getDetailedOwnership().getName() : null;

            String type = facilityResponse.getType() != null ? facilityResponse.getType().getName() : null;
            String detailedType = facilityResponse.getDetailedType() != null ? facilityResponse.getDetailedType().getName() : null;

            String facilityType = facilityResponse.getFacilityType() != null ? facilityResponse.getFacilityType() : null;


            String ward = facilityResponse.getWard() != null ? facilityResponse.getWard().getName() : null;
            String district = facilityResponse.getDistrict() != null ? facilityResponse.getDistrict().getName() : null;
            String region = facilityResponse.getRegion() != null ? facilityResponse.getRegion().getName() : null;

            return new String[]{code, name, latitude, longitude, ownership, detailedOwnership, facilityType, ward, district, region};


        }).collect(Collectors.toList());

        allData.sort((o1, o2) -> o2[1].compareTo(o1[1]));

        writer.writeAll(allData);
    }

    public static void writeOPDResponse(PrintWriter print, List<OPDByAgeResponse> diagnoses, String locale) {


        Locale aLocale = new Locale(locale);

        ResourceBundle messages = ResourceBundle.getBundle("MessagesBundle", aLocale);


        CSVWriter writer = new CSVWriter(print);

        String[] header = new String[]{
                messages.getString("Code"),
                messages.getString("Name"),
                messages.getString("Year"),
                messages.getString("Quarter"),
                messages.getString("Month"),
                messages.getString("Age<5"),
                messages.getString("Age5-60"),
                messages.getString("Age>60"),
                messages.getString("Total")};


        writer.writeNext(header);


        List<String[]> allData = diagnoses.stream().map(opdByAgeResponse -> {

            String id = opdByAgeResponse.getDiagnostic().getDhis2Id();

            String name = opdByAgeResponse.getDiagnostic().getName();

            if (locale != null) {

                List<Translation> translations = opdByAgeResponse.getDiagnostic().getTranslations().stream().filter(translation -> translation.getLocale().equalsIgnoreCase(locale)).collect(Collectors.toList());
                if (translations.size() > 0) {
                    name = translations.iterator().next().getValue();
                }
            }

            String year = opdByAgeResponse.getYear() != null ? opdByAgeResponse.getYear().toString() : null;
            String month = opdByAgeResponse.getMonth() != null ? opdByAgeResponse.getMonth().toString() : null;
            String quarter = opdByAgeResponse.getQuarter() != null && opdByAgeResponse.getQuarter() != -1 ? opdByAgeResponse.getQuarter().toString() : null;

            Long less5 = 0L;
            Long between5And60 = 0L;
            Long greater60 = 0L;
            Long total = 0L;
            for (OPDByAgeResponse.AgeValue val : opdByAgeResponse.getValues()) {
                total += val.getValue();
                switch (val.getAge().getDhis2Id()) {
                    case Constants.AGE_MONTH_LESS_1:
                    case Constants.AGE_MONTH_1_TO_12:
                    case Constants.AGE_YEAR_1_TO_5:
                        less5 += val.getValue();
                        break;
                    case Constants.AGE_YEAR_5_TO_60:
                        between5And60 += val.getValue();
                        break;
                    case Constants.AGE_YEAR_OVER_60:
                        greater60 += val.getValue();
                        break;
                }
            }

            return new String[]{id, name, year, quarter, month, less5.toString(), between5And60.toString(), greater60.toString(), total.toString()};

        }).collect(Collectors.toList());

        allData.sort((o1, o2) -> Integer.parseInt(o2[8]) - Integer.parseInt((o1[8])));

        writer.writeAll(allData);
    }


    public static void writeRMNCHResponse(PrintWriter print, List<RMNCHResponse> rmnchResponses, String locale) {
        Locale aLocale = new Locale(locale);

        ResourceBundle messages = ResourceBundle.getBundle("MessagesBundle", aLocale);


        CSVWriter writer = new CSVWriter(print);

        String[] header = new String[]{messages.getString("Code"),
                messages.getString("Service"),
                messages.getString("Year"),
                messages.getString("Quarter"),
                messages.getString("Month"),
                messages.getString("Count")};


        writer.writeNext(header);

        List<String[]> allData = rmnchResponses.stream().map(rmnchResponse -> {

            String id = rmnchResponse.getIndicator().getDhis2Id();

            String name = rmnchResponse.getIndicator().getName();

            if (locale != null) {

                List<Translation> translations = rmnchResponse.getIndicator().getTranslations().stream().filter(translation -> translation.getLocale().equalsIgnoreCase(locale)).collect(Collectors.toList());
                if (translations.size() > 0) {
                    name = translations.iterator().next().getValue();
                }
            }

            String year = rmnchResponse.getYear() != null ? rmnchResponse.getYear().toString() : null;

            String month = rmnchResponse.getMonth() != null ? rmnchResponse.getMonth().toString() : null;

            String quarter = rmnchResponse.getQuarter() != null && rmnchResponse.getQuarter() != -1 ? rmnchResponse.getQuarter().toString() : null;


            return new String[]{id, name, year, quarter, month, rmnchResponse.getValue().toString()};

        }).collect(Collectors.toList());

        allData.sort((o1, o2) -> Integer.parseInt(o2[5]) - Integer.parseInt((o1[5])));

        writer.writeAll(allData);
    }

}
