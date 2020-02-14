import { Injectable } from "@angular/core";

@Injectable()
export class FilterTableService {
  constructor() {}

  filterProjectTaskStatus(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      if (
        searchTerms.projectId &&
        searchTerms.assignmentId &&
        searchTerms.statusId
      ) {
        return (
          data.projectId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.projectId) !== -1 &&
          data.assignmentId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.assignmentId) !== -1 &&
          data.statusId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.statusId) !== -1
        );
      } else if (searchTerms.projectId && searchTerms.assignmentId) {
        return (
          data.projectId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.projectId) !== -1 &&
          data.assignmentId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.assignmentId) !== -1
        );
      } else if (searchTerms.projectId && searchTerms.statusId) {
        return (
          data.projectId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.projectId) !== -1 &&
          data.statusId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.statusId) !== -1
        );
      } else if (searchTerms.assignmentId && searchTerms.statusId) {
        return (
          data.assignmentId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.assignmentId) !== -1 &&
          data.statusId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.statusId) !== -1
        );
      } else if (searchTerms.projectId) {
        return (
          data.projectId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.projectId) !== -1
        );
      } else if (searchTerms.assignmentId) {
        return (
          data.assignmentId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.assignmentId) !== -1
        );
      } else if (searchTerms.statusId) {
        return (
          data.statusId
            .toString()
            .toLowerCase()
            .indexOf(searchTerms.statusId) !== -1
        );
      }  else {return data;}
    };
    return filterFunction;
  }

  filterDate(range) {
        // const date = new Date(valu);
        return function(value) {
          const start = new Date(value.startDate);
          const end = new Date(value.endDate);
          return start >= new Date(range.from) && end <=new Date(range.to);
        }
  }
}
