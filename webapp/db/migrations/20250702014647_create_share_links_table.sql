-- migrate:up
CREATE TABLE share_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    expires TIMESTAMPTZ NOT NULL,
    slug VARCHAR(32) UNIQUE NOT NULL,
    tunnel_binding_id UUID NOT NULL,
    one_time_use BOOLEAN NOT NULL,
    FOREIGN KEY (tunnel_binding_id) REFERENCES tunnel_bindings(id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE share_links;
