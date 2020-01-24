import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { IUserData } from "../interfaces/user-data";

@Injectable()
export class LocalStorageService {
  anotherTodolist = [];
  STORAGE_KEY = "local-user-data";

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.storage.clear();
  }

  public storeUserDataOnLocalStorage(userData: IUserData): void {
    // get array of tasks from local storage
    const currentUserData = this.storage.get(this.STORAGE_KEY) || []; // push new task to array

    currentUserData.push({
      email: userData.email,
      name: userData.name
    });

    // insert updated array to local storage
    this.storage.set(this.STORAGE_KEY, currentUserData);
  }

  public getUserDataFromLocalStorage(): { email: string; name: string } {
    const currentUserData = this.storage.get(this.STORAGE_KEY) || [];

    const data: { email: string; name: string } = currentUserData[0] || null;

    return data;
  }
}
