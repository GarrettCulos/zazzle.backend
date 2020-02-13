import ProjectSchema from '../models/project.graphql';
import UserSchema from '../models/user.graphql';
import PostSchema from '../models/post.graphql';
import MetricSchema from '../models/metric.graphql';
import MetricTemplate from '../models/metricTemplate.graphql';

export default `
    scalar Date

    scalar JSON
    
    ${PostSchema}
    
    ${MetricSchema}
    
    ${MetricTemplate}

    ${UserSchema}

    ${ProjectSchema}

    
`;
