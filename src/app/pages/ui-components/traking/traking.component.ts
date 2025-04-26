import { Component, OnInit } from '@angular/core';
import { TrackingData, TrackingLinkDTO } from './traking.data';
import { MainTableComponent, TableColumn } from '../main-table/main-table.component';
import { TrakingService } from './traking.service';
import { EditTrakingComponent } from './edit-traking/edit-traking.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";  // Correct import

@Component({
  selector: 'app-traking',
  standalone: true,
  imports: [
    MainTableComponent,
    MatDialogModule,
    MatButton,
    // Import only MatDialogModule
  ],
  templateUrl: './traking.component.html',
  styleUrls: ['./traking.component.scss']
})
export class TrakingComponent implements OnInit {
  trackingLinks: TrackingLinkDTO[] = [];  // Array to hold fetched data

  columns: TableColumn[] = [
    {
      name: 'id',
      header: 'ID',
      cell: (element: TrackingLinkDTO) => `${element.id}`
    },
    {
      name: 'idproduct',
      header: 'Product ID',
      cell: (element: TrackingLinkDTO) => `${element.idproduct}`
    },
    {
      name: 'pagename',
      header: 'Page Name',
      cell: (element: TrackingLinkDTO) => `${element.pagename}`
    },
    {
      name: 'timespent',
      header: 'Time Spent',
      cell: (element: TrackingLinkDTO) => `${element.timespent} seconds`
    },
    {
      name: 'clicks',
      header: 'Clicks',
      cell: (element: TrackingLinkDTO) => `${element.clicks}`
    },
    {
      name: 'entryTimeFormatted',
      header: 'Entry Time',
      cell: (element: TrackingLinkDTO) => `${element.entryTimeFormatted}`
    },
    {
      name: 'latitude',
      header: 'Latitude',
      cell: (element: TrackingLinkDTO) => `${element.latitude}`
    },
    {
      name: 'longitude',
      header: 'Longitude',
      cell: (element: TrackingLinkDTO) => `${element.longitude}`
    },
    {
      name: 'sessionId',
      header: 'Session ID',
      cell: (element: TrackingLinkDTO) => `${element.sessionId}`
    },
  ];

  tableConfig = {
    columns: this.columns,
    dataSource: this.trackingLinks,
    title: 'Tracking Links',
    showMenu: true, // Set to true if you want a menu
    menuItems: [
      {
        icon: 'edit',
        label: 'Edit',
        action: (element: TrackingLinkDTO) => this.editLink(element)
      },
      {
        icon: 'delete',
        label: 'Delete',
        action: (element: TrackingLinkDTO) => this.deleteLink(element)
      }
    ]

  };

  constructor(private trackingLinkService: TrakingService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchTrackingLinks();
  }

  fetchTrackingLinks(): void {
    this.trackingLinkService.getTracking().subscribe(
      (data: TrackingLinkDTO[]) => {
        this.trackingLinks = data;
        this.tableConfig.dataSource = this.trackingLinks;
      },
      (error) => {
        console.error('Error fetching tracking links:', error);
      }
    );
  }

  editLink(link: TrackingLinkDTO): void {
    const dialogRef = this.dialog.open(EditTrakingComponent, {
      width: '400px',
      data: {
        clicks: link.clicks,
        longitude: link.longitude,
        latitude: link.latitude,
        sessionId: link.sessionId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const trackingData: TrackingData = {
          pagename: result.pagename,
          timespent: result.timespent,
          clicks: result.clicks,
          longitude: result.longitude,
          latitude: result.latitude,
          sessionId: result.sessionId
        };

        // Call trackClientData to update the backend
        this.trackingLinkService.trackClientData(link.idproduct, link.sessionId, trackingData).subscribe({
          next: () => {
            console.log('Tracking data updated successfully');
            this.fetchTrackingLinks(); // Refresh the list after update
          },
          error: (error) => {
            console.error('Error updating tracking data:', error);
          }
        });
      }
    });
  }

  deleteLink(link: TrackingLinkDTO): void {
    console.log('Deleting link:', link);
    // Implement delete functionality here
  }
}
