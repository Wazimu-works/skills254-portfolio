import { createSupabaseAdminClient } from "@/lib/supabase/server";

type QueryResult<T> = {
  data: T;
  error?: string;
};

function fallback<T>(data: T, error?: unknown): QueryResult<T> {
  return {
    data,
    error: error instanceof Error ? error.message : undefined,
  };
}

export async function getAdminDashboardData() {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return fallback({
      totalBookings: 0,
      totalMixtapePlays: 0,
      totalCourseEnrollments: 0,
      revenue: 0,
      recentPayments: [],
      recentBookings: [],
    });
  }

  const [
    bookingsResponse,
    mixtapesResponse,
    coursesResponse,
    recentPaymentsResponse,
    recentBookingsResponse,
  ] = await Promise.all([
    supabase.from("bookings").select("id", { count: "exact", head: true }),
    supabase.from("mixtapes").select("play_count"),
    supabase.from("courses").select("enrollments_count"),
    supabase
      .from("payments")
      .select("id,status,paid_amount,amount,phone,description,receipt_number,created_at")
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("bookings")
      .select("id,full_name,event_type,event_date,location,status,deposit_paid,deposit_required")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const totalMixtapePlays = (mixtapesResponse.data ?? []).reduce(
    (sum, item) => sum + (item.play_count ?? 0),
    0,
  );
  const totalCourseEnrollments = (coursesResponse.data ?? []).reduce(
    (sum, item) => sum + (item.enrollments_count ?? 0),
    0,
  );
  const revenue = (recentPaymentsResponse.data ?? []).reduce(
    (sum, item) => sum + (item.paid_amount ?? item.amount ?? 0),
    0,
  );

  return fallback({
    totalBookings: bookingsResponse.count ?? 0,
    totalMixtapePlays,
    totalCourseEnrollments,
    revenue,
    recentPayments: recentPaymentsResponse.data ?? [],
    recentBookings: recentBookingsResponse.data ?? [],
  });
}

export async function getMixtapesAdminData() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return fallback([]);

  const { data, error } = await supabase
    .from("mixtapes")
    .select("id,title,genre,description,youtube_url,cover_image_path,audio_file_path,video_file_path,is_featured,is_trending,is_premium,play_count,tags,published,created_at")
    .order("created_at", { ascending: false });

  return fallback(data ?? [], error);
}

export async function getCoursesAdminData() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return fallback({ courses: [], modules: [] });

  const [coursesResponse, modulesResponse] = await Promise.all([
    supabase
      .from("courses")
      .select("id,title,level,price_kes,summary,is_active,is_premium,enrollments_count,course_file_path,created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("course_modules")
      .select("id,course_id,title,position,media_type,is_preview")
      .order("position", { ascending: true }),
  ]);

  return fallback(
    {
      courses: coursesResponse.data ?? [],
      modules: modulesResponse.data ?? [],
    },
    coursesResponse.error ?? modulesResponse.error,
  );
}

export async function getBookingsAdminData() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return fallback([]);

  const { data, error } = await supabase
    .from("bookings")
    .select("id,full_name,email,phone,event_type,event_date,location,guest_count,package_name,status,deposit_paid,deposit_required,invoice_number,client_whatsapp,notes,created_at")
    .order("created_at", { ascending: false });

  return fallback(data ?? [], error);
}

export async function getPricingAdminData() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return fallback([]);

  const { data, error } = await supabase
    .from("pricing_packages")
    .select("id,name,description,base_price_kes,deposit_kes,features,is_featured,discount_percentage,promo_text,is_discount_enabled")
    .order("base_price_kes", { ascending: true });

  return fallback(data ?? [], error);
}

export async function getPaymentsAdminData() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return fallback([]);

  const { data, error } = await supabase
    .from("payments")
    .select("id,status,receipt_number,merchant_request_id,checkout_request_id,phone,payment_type,description,amount,paid_amount,created_at")
    .order("created_at", { ascending: false });

  return fallback(data ?? [], error);
}

export async function getContentAdminData() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return fallback({ content: [], settings: [] });

  const [contentResponse, settingsResponse] = await Promise.all([
    supabase.from("site_content").select("id,key,title,body,metadata,updated_at").order("key"),
    supabase.from("site_settings").select("id,key,value,updated_at").order("key"),
  ]);

  return fallback(
    {
      content: contentResponse.data ?? [],
      settings: settingsResponse.data ?? [],
    },
    contentResponse.error ?? settingsResponse.error,
  );
}

export async function getMediaAdminData() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return fallback([]);

  const { data, error } = await supabase
    .from("media_assets")
    .select("id,name,bucket,file_path,kind,folder,tags,size_bytes,created_at")
    .order("created_at", { ascending: false });

  return fallback(data ?? [], error);
}

export async function getAnalyticsAdminData() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return fallback({
      snapshots: [],
      topMixtapes: [],
      topCourses: [],
    });
  }

  const [snapshotsResponse, topMixtapesResponse, topCoursesResponse] = await Promise.all([
    supabase
      .from("analytics_snapshots")
      .select("id,metric_key,metric_label,value_numeric,value_text,dimensions,captured_at")
      .order("captured_at", { ascending: false }),
    supabase
      .from("mixtapes")
      .select("id,title,play_count,is_featured,is_trending")
      .order("play_count", { ascending: false })
      .limit(5),
    supabase
      .from("courses")
      .select("id,title,enrollments_count,price_kes")
      .order("enrollments_count", { ascending: false })
      .limit(5),
  ]);

  return fallback(
    {
      snapshots: snapshotsResponse.data ?? [],
      topMixtapes: topMixtapesResponse.data ?? [],
      topCourses: topCoursesResponse.data ?? [],
    },
    snapshotsResponse.error ?? topMixtapesResponse.error ?? topCoursesResponse.error,
  );
}
