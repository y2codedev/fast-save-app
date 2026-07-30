<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 40px;
            background-color: #f9fafb;
          }
          #content {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          h1 {
            color: #4f46e5;
            font-size: 24px;
            margin-top: 0;
            margin-bottom: 10px;
          }
          p {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            text-align: left;
            background-color: #f3f4f6;
            color: #374151;
            padding: 12px;
            font-weight: 600;
            border-bottom: 2px solid #e5e7eb;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
            color: #4b5563;
          }
          tr:hover td {
            background-color: #f9fafb;
          }
          a {
            color: #4f46e5;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .lang-badge {
            display: inline-block;
            background: #e0e7ff;
            color: #4338ca;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 11px;
            margin-right: 4px;
            margin-bottom: 4px;
          }
        </style>
      </head>
      <body>
        <div id="content">
          <h1>ConvertAllNow XML Sitemap</h1>
          <p>This is a standard XML sitemap generated for search engines. It contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.</p>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Priority</th>
                <th>Change Freq</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td><xsl:value-of select="sitemap:priority"/></td>
                  <td><xsl:value-of select="sitemap:changefreq"/></td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
