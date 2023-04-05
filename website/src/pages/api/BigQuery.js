import { BigQuery } from "@google-cloud/bigquery";

export default async function handler(req,res){
    const bigquery = new BigQuery({
        projectId:  process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, "\n")
        }
    });

    const query =  `SELECT * FROM \`seass.heatmap_data\``;
    const [rows] = await bigquery.query(query);

    res.status(200).json(rows);
}