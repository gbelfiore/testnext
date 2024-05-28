import distance from "@turf/distance";
import { featureCollection, point } from "@turf/helpers";
//import { featureEach } from "@turf/meta";
//import { featureEach } from "../../../node_modules/@turf/meta/index";
import { type IPointGeo } from "~/typings/geospatial";

class NearestPoint {
  static unit = "kilometers";
  static calculate(refPoint: IPointGeo, pointList: IPointGeo[]) {
    const targetPoint = point([refPoint.x, refPoint.y]);
    const points = featureCollection(
      pointList.map((item) => point([item.x, item.y])),
    );

    let minDist = Infinity;
    let bestFeatureIndex = -1;
    const distances: number[] = [];

    points.features.forEach((element, featureIndex) => {
      const distanceToPoint = distance(targetPoint, element.geometry, {
        units: NearestPoint.unit,
      } as any);
      distances.push(distanceToPoint);
      if (distanceToPoint < minDist) {
        bestFeatureIndex = featureIndex;
        minDist = distanceToPoint;
      }
    });

    /*  featureEach(points, (pt, featureIndex) => {
      const distanceToPoint = distance(targetPoint, pt, {
        units: NearestPoint.unit,
      } as any);
      distances.push(distanceToPoint);
      if (distanceToPoint < minDist) {
        bestFeatureIndex = featureIndex;
        minDist = distanceToPoint;
      }
    }); */

    return {
      minIndex: bestFeatureIndex,
      minDistance: minDist,
      distances,
    };
  }
}

export { NearestPoint };
