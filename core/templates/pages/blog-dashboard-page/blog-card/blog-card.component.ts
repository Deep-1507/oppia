// Copyright 2021 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Component for a blog card.
 */

import { Component, Input, OnInit } from '@angular/core';
import { AppConstants } from 'app.constants';
import { BlogPostSummary } from 'domain/blog/blog-post-summary.model';
import { AssetsBackendApiService } from 'services/assets-backend-api.service';
import { UrlInterpolationService } from 'domain/utilities/url-interpolation.service';
import dayjs from 'dayjs';

@Component({
  selector: 'oppia-blog-card',
  templateUrl: './blog-card.component.html'
})
export class BlogCardComponent implements OnInit {
  @Input() blogPostSummary!: BlogPostSummary;
  @Input() authorProfilePicDataUrl!: string;
  authorProfilePictureUrl: string;
  DEFAULT_PROFILE_PICTURE_URL: string = '';
  thumbnailUrl: string = '';
  publishedDateString: string = '';

  constructor(
    private assetsBackendApiService: AssetsBackendApiService,
    private urlInterpolationService: UrlInterpolationService,
  ) {}

  ngOnInit(): void {
    if (this.blogPostSummary.thumbnailFilename) {
      this.thumbnailUrl = this.assetsBackendApiService
        .getThumbnailUrlForPreview(
          AppConstants.ENTITY_TYPE.BLOG_POST, this.blogPostSummary.id,
          this.blogPostSummary.thumbnailFilename);
    }
    this.DEFAULT_PROFILE_PICTURE_URL = this.urlInterpolationService
      .getStaticImageUrl('/general/no_profile_picture.png');
    this.authorProfilePictureUrl = decodeURIComponent((
      this.authorProfilePicDataUrl || this.DEFAULT_PROFILE_PICTURE_URL));
    this.publishedDateString = this.getDateStringInWords(
      this.blogPostSummary.publishedOn);
  }

  getDateStringInWords(naiveDate: string): string {
    return dayjs(
      naiveDate.split(',')[0], 'MM-DD-YYYY').format('MMMM D, YYYY');
  }
}