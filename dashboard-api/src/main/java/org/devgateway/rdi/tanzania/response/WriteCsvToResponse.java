package org.devgateway.rdi.tanzania.response;

import com.opencsv.CSVWriter;
import org.devgateway.rdi.tanzania.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.PrintWriter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Sebastian Dimunzio
 */

public class WriteCsvToResponse {

    private static final Logger LOGGER = LoggerFactory.getLogger(WriteCsvToResponse.class);

    public static void writeOPDResponse(PrintWriter print, List<OPDByAgeResponse> diagnoses) {

        CSVWriter writer = new CSVWriter(print);

        String[] header = new String[]{"ID", "Name", "Year", "Quarter", "Month", "Age< 5", "Age5-60", "Age>60", "Total"};
        writer.writeNext(header);

        List<String[]> allData = diagnoses.stream().map(opdByAgeResponse -> {

            String id = opdByAgeResponse.getDiagnostic().getDhis2Id();

            String name = opdByAgeResponse.getDiagnostic().getName();

            String year = opdByAgeResponse.getYear() != null ? opdByAgeResponse.getYear().toString() : null;

            String month = opdByAgeResponse.getMonth() != null ? opdByAgeResponse.getMonth().toString() : null;

            String quarter = opdByAgeResponse.getQuarter() != null ? opdByAgeResponse.getQuarter().toString() : null;

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


    public static void writeRMNCHResponse(PrintWriter print, List<RMNCHResponse> rmnchResponses) {

        CSVWriter writer = new CSVWriter(print);

        String[] header = new String[]{"ID", "Service", "Year", "Quarter", "Month", "Count"};
        writer.writeNext(header);

        List<String[]> allData = rmnchResponses.stream().map(rmnchResponse -> {

            String id = rmnchResponse.getIndicator().getDhis2Id();

            String name = rmnchResponse.getIndicator().getName();

            String year = rmnchResponse.getYear() != null ? rmnchResponse.getYear().toString() : null;

            String month = rmnchResponse.getMonth() != null ? rmnchResponse.getMonth().toString() : null;

            String quarter = rmnchResponse.getQuarter() != null ? rmnchResponse.getQuarter().toString() : null;


            return new String[]{id, name, year, quarter, month, rmnchResponse.getValue().toString()};

        }).collect(Collectors.toList());

        allData.sort((o1, o2) -> Integer.parseInt(o2[5]) - Integer.parseInt((o1[5])));

        writer.writeAll(allData);
    }

}
